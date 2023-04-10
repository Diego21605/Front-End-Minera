import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selling: string = '';
  count: number = 0;
  highQualification: number = 0;
  total: number = 0;

  sellBrandsTitle: string[] = [];
  sellBrandsValue: number[] = [];

  brands: string[] = [];
  brandsFill: number[] = [];

  bestBrandsPriceTitle: string[] = [];
  bestBrandsPriceValue: Array<any> = [];

  bestBrandsTitle: string[] = [];
  bestBrandsValues: number[] = [];

  priceSizeTitle:string[] = [];
  priceSizeValue:any[] = [];

  updateRateTitle:string[] = [];
  updateRateValue:string[] = [];

  lineData: unknown;
  lineOptions: unknown;

  barData: any;
  barOptions: any;

  barData2: any;
  barOptions2: any;

  pieData: unknown;
  pieOptions: unknown;

  doughnutData: unknown;
  doughnutOptions: unknown;

  polarData: unknown;
  polarOptions: unknown;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getQualification();
    this.getTotal();
    this.getBrands();
    this.getBestBrands();
    this.getAllRecords();
    this.getSelling();
    this.getSellByBrands();
    this.getPriceBestBrands();
    this.getPriceSize();
    this.getUpdateRate();
    setTimeout(() => {
      this.initLineChart();
      this.initBarChart();
      this.initBar2Chart();
      this.initPieChart();
      this.initDoughnutChart();
      this.initPolarChart();
    }, 1000);
  }

  //#region Inicializar las graficas
  initLineChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.lineData = {
      labels: this.bestBrandsPriceTitle,
      datasets: [
        {
          label: this.bestBrandsPriceTitle[0],
          data: this.bestBrandsPriceValue[0],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: this.bestBrandsPriceTitle[1],
          data: this.bestBrandsPriceValue[1],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        },
        {
          label: this.bestBrandsPriceTitle[2],
          data: this.bestBrandsPriceValue[2],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          tension: .4
        }
      ]
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  initBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: this.sellBrandsTitle,
      datasets: [
        {
          label: 'Ventas',
          data: this.sellBrandsValue,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  initPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieData = {
      labels: this.bestBrandsTitle,
      datasets: [
        {
          data: this.bestBrandsValues,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  initDoughnutChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.doughnutData = {
      labels: this.sellBrandsTitle,
      datasets: [
        {
          data: this.sellBrandsValue,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.doughnutOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  initBar2Chart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData2 = {
      labels: this.priceSizeTitle,
      datasets: [
        {
          label: 'Ventas',
          data: this.priceSizeValue,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.barOptions2 = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  initPolarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.polarData = {
      datasets: [
        {
          data: this.updateRateValue,
          backgroundColor: [
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--bluegray-500'),
            documentStyle.getPropertyValue('--blue-500')
          ],
          label: 'Tasa de Refrezco'
        }
      ],
      labels: this.updateRateTitle
    };

    this.polarOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
  //#endregion

  //#region Consulta de datos
  getSelling() {
    this.dashboardService.getSelling().subscribe({
      next: (res: any) => {
        this.selling = res[0].brand;
      },
      error: (err: any) => console.log(err)
    });
  }

  getQualification() {
    this.dashboardService.getQualification().subscribe({
      next: (res: any) => {
        this.highQualification = res[0].qualification;
      },
      error: (err: any) => console.log(err)
    });
  }

  getTotal() {
    this.dashboardService.getTotal().subscribe({
      next: (res: any) => {
        this.total = res[0].sum_price;
      },
      error: (err: any) => console.log(err)
    });
  }

  getSellByBrands() {
    this.dashboardService.getAllSellByBrands().subscribe({
      next: (res: any) => {
        res.forEach((element: { brand: string; count: number }) => {
          this.sellBrandsTitle.push(element.brand);
          this.sellBrandsValue.push(element.count);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getBrands() {
    this.dashboardService.getAllBrands().subscribe({
      next: (res: any) => {
        res.forEach((element: { brand: string; }) => {
          this.brands.push(element.brand)
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getBestBrands() {
    this.dashboardService.getBestBrands().subscribe({
      next: (res: any) => {
        res.forEach((element: { brand: string; count: number }) => {
          this.bestBrandsTitle.push(element.brand);
          this.bestBrandsValues.push(element.count);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getAllRecords() {
    this.dashboardService.getAllRecords().subscribe({
      next: (res: any) => {
        this.count = res[0].count;
        this.brandsFill.length = this.count;
        this.brandsFill.fill(50);
      },
      error: (err: any) => console.log(err)
    });
  }

  getPriceBestBrands() {
    this.dashboardService.getPriceBestBrands().subscribe({
      next: (res: any) => {
        res.forEach((element: { brand: string; prices: string }) => {
          this.bestBrandsPriceTitle.push(element.brand);
          this.bestBrandsPriceValue.push(element.prices);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getPriceSize() {
    this.dashboardService.getPriceSize().subscribe({
      next: (res: any) => {
        res.forEach((element: { size_screen: string; prices: any }) => {
          this.priceSizeTitle.push(element.size_screen);
          this.priceSizeValue.push(element.prices[0]);
        });
      },
      error: (err: any) => console.log(err)
    });
  }

  getUpdateRate() {
    this.dashboardService.getUpdateRate().subscribe({
      next: (res: any) => {
        res.forEach((element: { update_rate: string; count: any }) => {
          this.updateRateTitle.push(element.update_rate);
          this.updateRateValue.push(element.count);
        });
      },
      error: (err: any) => console.log(err)
    });
  }
  //#endregion

}
