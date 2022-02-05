import React from "react";
import Chart from "react-apexcharts";

import './statuscard.css'

const chartoption = {
    series: [30, 70],
    labels: ['Apple', 'Mango'],
    options:{
        legend: {
            show: false,
        },
        dataLabels: {
            enabled:false,
        },
        plotOptions: {
            pie: {
              startAngle: 0,
              endAngle: 360,
              expandOnClick: true,
              offsetX: 0,
              offsetY: 0,
              customScale: 1,
              donut: {
                size: '65%',
                background: 'transparent',
                labels: {
                  show: true,
                  name: {
                    show: false,
                    fontSize: '22px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    color: '#48B6F1',
                    offsetY: -10,
                    formatter: function (val) {
                      return val
                    }
                  },
                  value: {
                    show: true,
                    showAlways: true,
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    color: undefined,
                    offsetY: 5,
                    formatter: function (val) {
                      return val
                    }
                  },
                }
              },      
            }
          }
    }
};

const StatusCard = (props) => {
    return (
        <div className="status-card" id={props.className}>
            <div className="card_info">
                <p className="category_label">{props.label}</p>
                <div className="data">
                    <p className="data_text">{props.data}</p>
                    <p className="measure">{props.measure}</p>
                </div>
            </div>
            <div className="comparison">
              지난달 대비 3% 증가
            </div>
        </div>
    )
}

export default StatusCard
