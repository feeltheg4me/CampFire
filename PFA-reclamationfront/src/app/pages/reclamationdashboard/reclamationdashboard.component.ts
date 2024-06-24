import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ReclamationService} from "../../services/reclamation.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ChartDataSets, ChartType} from "chart.js";
import {Color} from "ng2-charts";

@Component({
  selector: 'app-reclamationdashboard',
  templateUrl: './reclamationdashboard.component.html',
  styleUrls: ['./reclamationdashboard.component.css']
})
export class ReclamationdashboardComponent implements OnInit {
  constructor(private reclamationService: ReclamationService,private router:Router) {}
  ngOnInit() {
    this.groupbystatus();
    this.reclamationsCountToday();
    this.reclamationsExceeding();
    this.topusereclamed();
    this.getSessionsPerDay();

  }
  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'left', // Change the position of the legend (top, bottom, left, right)
    },
    tooltips: {

    },
  };
  public pieChartLabels: string[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: any[] = [
    {
      backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(255, 255, 0, 0.5)', 'rgba(0, 128, 0, 0.5)'],
    },
  ];
  public pieChartData: number[] = [];
  groupbystatus() {
    this.reclamationService.groupbystatus().subscribe((data) => {

      // Assuming data has labels and counts properties
      const classes: string[] = data.labels;

      const counts: number[] = data.counts;


      this.pieChartLabels = classes;
      this.pieChartData = counts;

      ;
    });
  }

  nbrDeReclamationCeJour:any;
  reclamationsCountToday(){
    this.reclamationService.reclamationsCountToday().subscribe(
   (data)=>
      {
        console.log(data);
        this.nbrDeReclamationCeJour=data.count;
      }
    )

}

  reclamationsExceeding3DaysPending:any;
    reclamationsExceeding(){
      this.reclamationService.reclamationsExceeding3DaysPending().subscribe(
        (data)=>
        {
          console.log(data);
          this.reclamationsExceeding3DaysPending=data.count;
        }
      )


    }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,

        }
      }]
    }
  };
  public top5userreclamedcolors: any[] = [
    {
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    },
  ];
  public barChartLabelsreclamationbyuser:any[] = [];
  public barChartTypereclamationbyuser: any = 'bar';
  public barChartLegendreclamationbyuser: boolean = true;
  public barChartDatareclamationbyuser: any[] = [];
  topusereclamed() {
    this.reclamationService.groupbyuser().subscribe(data => {

      const labels: string[] = data.labels;

      const values: number[] = data.counts;

      this.barChartLabelsreclamationbyuser= labels;

      this.barChartDatareclamationbyuser = [{ data: values, label: 'nomber of reclamationby user' }];}


    );

  }

  public areaChartOptions:
    any = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public areaChartColors: Color[] = [
    {
      borderColor: 'blue', // Set the border color of the line chart
      backgroundColor: 'rgba(0, 0, 255, 0.1)', // Set the background color of the line chart area
    }
  ]

  public areaChartLabels: string[] = [];
  public areaChartType: ChartType = 'line';
  public areaChartLegend = true;
  public areaChartData: ChartDataSets[] = [];
  getSessionsPerDay() {
    this.reclamationService.reclamationsByMonth().subscribe((data) => {
      const days: string[] = data.labels;

      const values: number[] = data.counts;



      this.areaChartLabels = days;
      this.areaChartData = [{ data: values, label: 'Reclamations par mois', fill: false }];
    });
  }


}
