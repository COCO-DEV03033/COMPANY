import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap"

class TodayEarning extends React.Component {
  state = {
    options: {
      chart: {
        sparkline: { enabled: true },
        toolbar: { show: false }
      },
      states: {
        hover: {
          filter: "none"
        }
      },
      colors: [
        this.props.labelColor,
        this.props.labelColor,
        this.props.primary,
        this.props.labelColor,
        this.props.labelColor,
        this.props.labelColor
      ],
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
          endingShape: "rounded"
        }
      },
      tooltip: {
        x: { show: false }
      },
      xaxis: {
        type: "numeric"
      }
    },
    series: [
      {
        name: "Sessions",
        data: [75, 125, 225, 175, 125, 75, 25]
      }
    ]
  }
  render() {
    return (
      <Card>
        <CardBody>
          <Row className="pb-50">
            <Col
              lg={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              xs={{ order: 1 }}
              className="d-flex justify-content-between flex-column mt-lg-0 mt-2"
            >
              <div className="session-info">
                <h2 className="text-bold-600 mb-25">Today Total Earning</h2>
                <p className="text-bold-500 mb-75">2024-02-13</p>
                <h5 className="font-medium-2">
                  <span className="text-success">$ 144,500 </span>
                </h5>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}
export default TodayEarning
