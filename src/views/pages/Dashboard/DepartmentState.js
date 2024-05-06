import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Progress } from "reactstrap"
import { ArrowUp, ArrowDown } from "react-feather"

class DepartmentState extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>State of Departments</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <h4>345</h4>
              <p className="mb-25">73%</p>
            </div>
            <div className="stastics-info text-right">
              <span>
                800 <ArrowUp size={15} className="text-success" />
              </span>
            </div>
          </div>
          <Progress className="mb-2" value="73" />
          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <h4>812</h4>
              <p className="mb-25">68%</p>
            </div>
            <div className="stastics-info text-right">
              <span>
                -200 <ArrowDown size={15} className="text-danger" />
              </span>
            </div>
          </div>
          <Progress className="mb-2" value="68" />
          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <h4>524</h4>
              <p className="mb-25">75%</p>
            </div>
            <div className="stastics-info text-right">
              <span>
                -200 <ArrowDown size={15} className="text-danger" />
              </span>
            </div>
          </div>
          <Progress className="mb-2" value="75" />

          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <h4>AI</h4>
              <p className="mb-25">80%</p>
            </div>
            <div className="stastics-info text-right">
              <span>
                100 <ArrowUp size={15} className="text-success" />
              </span>
            </div>
          </div>
          <Progress className="mb-2" value="80" />

          <div className="d-flex justify-content-between mb-25">
            <div className="browser-info">
              <h4>Control</h4>
              <p className="mb-25">59%</p>
            </div>
            <div className="stastics-info text-right">
              <span>
                -450 <ArrowDown size={15} className="text-danger" />
              </span>
            </div>
          </div>
          <Progress className="mb-2" value="59" />
        </CardBody>
      </Card>
    )
  }
}
export default DepartmentState
