import express from 'express';

export const charts = (app: express.Express): void => {
  type ChartData = {
    label: string;
    data: number;
  };

  type BarData = {
    label: string;
    data: ChartData[];
  };

  const pieData: ChartData[] = [
    {
      label: 'Red',
      data: 300
    },
    {
      label: 'Blue',
      data: 50
    },
    {
      label: 'Yellow',
      data: 100
    }
  ];

  const lineData: ChartData[] = [
    {
      label: 'Jan',
      data: 65
    },
    {
      label: 'Feb',
      data: 59
    },
    {
      label: 'Mar',
      data: 80
    },
    {
      label: 'Apr',
      data: 81
    },
    {
      label: 'May',
      data: 56
    },
    {
      label: 'Jun',
      data: 55
    },
    {
      label: 'Jul',
      data: 40
    }
  ];

  const barData: BarData[] = [
    {
      label: 'A店 来客数',
      data: [
        {
          label: '8月1日',
          data: 62
        },
        {
          label: '8月2日',
          data: 65
        },
        {
          label: '8月3日',
          data: 93
        },
        {
          label: '8月4日',
          data: 85
        },
        {
          label: '8月5日',
          data: 51
        },
        {
          label: '8月6日',
          data: 66
        },
        {
          label: '8月7日',
          data: 47
        }
      ]
    },
    {
      label: 'B店 来客数',
      data: [
        {
          label: '8月1日',
          data: 55
        },
        {
          label: '8月2日',
          data: 45
        },
        {
          label: '8月3日',
          data: 73
        },
        {
          label: '8月4日',
          data: 75
        },
        {
          label: '8月5日',
          data: 41
        },
        {
          label: '8月6日',
          data: 45
        },
        {
          label: '8月7日',
          data: 58
        }
      ]
    },
    {
      label: 'C店 来客数',
      data: [
        {
          label: '8月1日',
          data: 33
        },
        {
          label: '8月2日',
          data: 45
        },
        {
          label: '8月3日',
          data: 62
        },
        {
          label: '8月4日',
          data: 55
        },
        {
          label: '8月5日',
          data: 31
        },
        {
          label: '8月6日',
          data: 45
        },
        {
          label: '8月7日',
          data: 38
        }
      ]
    }
  ];

  app.get('/charts/pie', (req: express.Request, res: express.Response) => {
    res.json(pieData);
  });

  app.get('/charts/line', (req: express.Request, res: express.Response) => {
    res.json(lineData);
  });

  app.get('/charts/bar', (req: express.Request, res: express.Response) => {
    res.json(barData);
  });
};
