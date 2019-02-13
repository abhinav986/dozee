import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

declare function require(url: string);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('br') canvas: ElementRef;
  @ViewChild('hr') heart: ElementRef;
  @ViewChild('hypno') hypnogram: ElementRef;
  @ViewChild('movement') movement: ElementRef;
  @ViewChild('snoring') snor: ElementRef;
  @ViewChild('apn') apn: ElementRef;
  @ViewChild('pie') pie: ElementRef;





  chart: any;
  require: any;
  total_sleep: string;
  deep_sleep: string;
  awake: string;
  rem_sleep: string;

  ngOnInit(){
    this.breatheChart();
    this.heartChart();
    this.hypnogramChart();
    this.movementChart();
    this.snoring();
    this.Apn();
    this.sleepTime();

    
      
    //console.log("Json data : ", JSON.stringify(data['breathRates']));
  }
  pieChart(){

  }

  sleepTime(){
    var data = require('src/app/data.json');
    let tym = data['durations']

    console.log(tym);
    //getting total sleep time
    var date = new Date(tym.total * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var tym1 = hours +":"+minutes ;
    this.total_sleep = tym1;

    //getting deep sleep
    var date = new Date(tym.deep * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var tym1 = hours +":"+minutes ;
    this.deep_sleep = tym1;

    //getting awake time
    var date = new Date(tym.totalAwake * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var tym1 = hours +":"+minutes ;
    this.awake = tym1;

    //getting rem sleep
    var date = new Date(tym.rem * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var tym1 = hours +":"+minutes ;
    this.rem_sleep = tym1;

    var data2 = {
      labels: ["Total Time", "Deep Sleep", "Awake", "Rem Sleep"],
      datasets: [
        {
          label: "",
          data: [60, 20, 10, 10],
          backgroundColor: [
            "#FAEBD7",
            "#DCDCDC",
            "#E9967A",
            "#F5DEB3",
            "#9ACD32"
          ],
          borderColor: [
            "#E9DAC6",
            "#CBCBCB",
            "#D88569",
            "#E4CDA2",
            "#89BC21"
          ],
          borderWidth: [1, 1, 1, 1, 1]
        }
      ]
    };

    var options = {
      responsive: true,
      title: {
        display: true,
        position: "top",
        text: "Pie Chart",
        fontSize: 18,
        fontColor: "#111"
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#333",
          fontSize: 16
        }
      }
    };
    this.chart = new Chart(this.pie.nativeElement.getContext('2d'),{
      type: 'pie',
      data : data2,
    
      options: options
    });
  }

  hypnogramChart(){
    var data = require('src/app/data.json');
    let hyp = data['stages']
    let stage = []
    let timeData = []

    hyp.forEach((res) => { 
      stage.push(res.stage);
      /***if(res.stage == 4){
        stage.push("Awake");

      }else if(res.stage == 3){

        stage.push("REM")
        
      }else if(res.stage == 2){

        stage.push("Light")

      }else if(res.stage == 1){

        stage.push("Deep")
      }***/
      
      var date = new Date(res.ts * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var tym = hours +":"+minutes ;
      timeData.push(tym);
      
    })
    
    this.chart = new Chart(this.hypnogram.nativeElement.getContext('2d'),{
      type: 'line',
        data: {
          labels: timeData,
          datasets: [
            {
              data: stage,
              steppedLine: true,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
    });
      
  }

  heartChart(){
    var data = require('src/app/data.json');
    let hr = data['heartRates']
    let hr1 = hr[0]
    let heartData = []
    let timeData = []

    hr1.forEach((res) => { 
      heartData.push(res.hR);
      var date = new Date(res.ts * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var tym = hours +":"+minutes ;
      timeData.push(tym);
    })
    
    this.chart = new Chart(this.heart.nativeElement.getContext('2d'),{
      type: 'line',
        data: {
          labels: timeData,
          datasets: [
            {
              data: heartData,
              steppedLine: true,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
    });
  }

  breatheChart(){
    var data = require('src/app/data.json');
    let br = data['breathRates']
    let br1 = br[0]
    let breatheData = []
    let timeData = []

    br1.forEach((res) => { 
      breatheData.push(res.bR);
      var date = new Date(res.ts * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var tym = hours +":"+minutes ;
      timeData.push(tym);
    })
    
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'),{
      type: 'line',
        data: {
          labels: timeData,
          datasets: [
            {
              data: breatheData,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
    });
  }

  movementChart(){
    var data = require('src/app/data.json');
    let mov = data['events']
    let movement = []
    let timeData = []

    mov.forEach((res) => {
      if(res.hasOwnProperty('MV')){
        movement.push(res.MV.duration);
        var date = new Date(res.ts * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var tym = hours +":"+minutes ;
        timeData.push(tym);   
      }
      
    })
    
    this.chart = new Chart(this.movement.nativeElement.getContext('2d'),{
      type: 'bar',
      data: {
          labels: timeData,
          datasets: [{
              data: movement,
              backgroundColor: "black",
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  }

  snoring(){
    var data = require('src/app/data.json');
    let mov = data['events']
    let snoring = []
    let timeData = []

    mov.forEach((res) => {
      if(res.hasOwnProperty('SN')){
        snoring.push(res.SN.frequency);
        var date = new Date(res.ts * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var tym = hours +":"+minutes ;
        timeData.push(tym);   
      }
      
    })
    
    this.chart = new Chart(this.snor.nativeElement.getContext('2d'),{
      type: 'bar',
      data: {
          labels: timeData,
          datasets: [{
              data: snoring,
              backgroundColor: "black",
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  }

  Apn(){
    var data = require('src/app/data.json');
    let mov = data['events']
    let ap = []
    let timeData = []

    mov.forEach((res) => {
      if(res.hasOwnProperty('APN')){
        ap.push(res.APN.duration);
        var date = new Date(res.ts * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var tym = hours +":"+minutes ;
        timeData.push(tym);   
      }
      
    })
    
    this.chart = new Chart(this.apn.nativeElement.getContext('2d'),{
      type: 'bar',
      data: {
          labels: timeData,
          datasets: [{
              data: ap,
              backgroundColor: "black",
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  }
  
}

