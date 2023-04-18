import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  where,
  getDoc,
  query,
  updateDoc
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import axios from 'axios';

import { linkActionTypes } from '../redux/types';
import app from '../firebase.config';

export interface IReferralLink {
  id: string;
  name: string;
  referralId: string;
  clicks: number;
}

export interface IUser {
  ip: string;
  country: string;
  city: string;
  time: string;
  date: string;
}

export interface ILink {
  id: string;
  mainLink: string;
  linkId: string;
  referralLinks: IReferralLink[];
  clicks: number;
  users: IUser[] | [];
}

class LinkService {
  private static instance: LinkService;
  private firestore = getFirestore(app);
  private storage = getStorage(app);
  private teamData: string[] = [];
  private constructor() {}

  public static getInstance(): LinkService {
    if (!LinkService.instance) {
      LinkService.instance = new LinkService();
    }
    return LinkService.instance;
  }

  public async getTeamExcel() {
    const storageRef = ref(this.storage, 'gdsc team.xlsx');
    const file = await getDownloadURL(storageRef);
    return file;
  }

  public getExcelData(fileUrl: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event: any) => {
        const blob = xhr.response;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const dataExcel: any[] = XLSX.utils.sheet_to_json(worksheet);

          const team: string[] = dataExcel.map((item: any) => {
            return Object.values(item)[0] as string;
          });

          this.teamData = [...team, Object.keys(dataExcel[0])[0]];
          resolve([...team, Object.keys(dataExcel[0])[0]]);
        };
        reader.readAsBinaryString(blob);
      };

      xhr.open('GET', fileUrl);
      xhr.send();
    });
  }

  public async createLink(
    mainLink: string,
    linkId: string,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const teamFile = await this.getTeamExcel();
    await this.getExcelData(teamFile);

    const referralIds: IReferralLink[] = this.teamData.map((item: string) => {
      const referralId = Math.random().toString(36).substring(2, 8);
      return {
        id: item.toLowerCase().replace(' ', '_'),
        name: item,
        referralId: referralId,
        clicks: 0
      } as IReferralLink;
    });

    const link: ILink = {
      id: Math.random().toString(36).substring(2, 8),
      mainLink: mainLink,
      linkId: linkId,
      referralLinks: referralIds,
      clicks: 0,
      users: []
    };

    addDoc(collection(this.firestore, 'links'), link)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        toast.success('Link created successfully!');
        setSuccess(true);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        toast.error('Link creation failed! please try again');
      });
  }

  public getLinks(): any {
    return (dispatch: any) => {
      dispatch({
        type: linkActionTypes.SET_LOADING,
        payload: true
      });
      const links: ILink[] = [],
        ids: string[] = [];
      getDocs(collection(this.firestore, 'links')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          links.push(doc.data() as ILink);
          ids.push(doc.id);
        });
        dispatch({
          type: linkActionTypes.SET_LINKS,
          payload: { ids, data: links }
        });
        dispatch({
          type: linkActionTypes.SET_LOADING,
          payload: false
        });
      });
    };
  }

  public async getLinkById(id: string) {
    const response = await axios.get(
      `https://ip.zxq.co`
    );
    const user: IUser = {
      ip: response.data.ip as string,
      country: response.data.country as string,
      city: response.data.city as string,
      time: new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      ).toLocaleTimeString() as string,
      date: new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      ).toLocaleDateString() as string
    };

    const q = query(
      collection(this.firestore, 'links'),
      where('linkId', '==', id)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const allDocs = await getDocs(collection(this.firestore, 'links'));
      let docdata: any, index: number, document: any;

      allDocs.forEach((doc: any) => {
        const data = doc.data() as ILink;
        data.referralLinks.forEach((referral: IReferralLink, key: number) => {
          if (referral.referralId === id) {
            index = key;
            document = doc;
            docdata = {
              id: doc.id,
              data: doc.data() as ILink
            };
          }
        });
      });

      if (!docdata) {
        return null;
      }

      // check if user is already present in the array

      const isPresent = docdata.data.users.some(
        (item: IUser) => item.ip === user.ip
      );

      if (isPresent) {
        return docdata;
      }

      await updateDoc(document.ref, {
        clicks: docdata.data.clicks + 1,
        referralLinks: docdata.data.referralLinks.map(
          (item: IReferralLink, key: number) => {
            if (key === index) {
              return {
                ...item,
                clicks: item.clicks + 1
              };
            }
            return item;
          }
        ),
        users: [...docdata.data.users, user]
      });

      return docdata;
    }

    const doc = querySnapshot.docs[0];
    const isPresent = doc
      .data()
      .users.some((item: IUser) => item.ip === user.ip);

    if (isPresent) {
      return {
        id: doc.id,
        data: doc.data() as ILink
      };
    }
    await updateDoc(doc.ref, {
      clicks: doc.data().clicks + 1,
      users: [...doc.data().users, user]
    });
    return {
      id: doc.id,
      data: doc.data() as ILink
    };
  }
}

export default LinkService;
