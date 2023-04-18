export default function chartInfo(linkData: any) {
  const { users } = linkData;

  let labels: Array<string> = [];
  let data: Array<number> = [];

  const userCountByDate = users?.reduce((acc: any, user: any) => {
    const { date } = user;
    if (acc[date]) {
      acc[date]++;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  Object.keys(userCountByDate).forEach((date) => {
    labels.push(date);
    data.push(userCountByDate[date]);
  });

  return {
    labels,
    data
  };
}
