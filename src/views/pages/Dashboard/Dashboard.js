import React from "react"
import { Row, Col } from "reactstrap"
import TodayEarning from "./TodayEarning"
import DepartmentToday from "./DepartmentToday"
import DepartmentState from "./DepartmentState"
import ProductDev from "./ProductDev"
import Percent from "./Percent"
import Members from "./Members"
import "../../../assets/scss/plugins/charts/apex-charts.scss"

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7"
class Home extends React.Component{
  render(){
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            <TodayEarning labelColor={$label_color} primary={$primary} />
          </Col>
          <Col lg="8" md="6" sm="12">
            <DepartmentToday
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="8" md="6" sm="12">
            <DepartmentState />
          </Col>
          <Col lg="4" md="6" sm="12">
            <Percent
                primary={$primary}
                warning={$warning}
                danger={$danger}
                primaryLight={$primary_light}
                warningLight={$warning_light}
                dangerLight={$danger_light}
              />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="6" md="12">
            <Members />
          </Col>
          <Col lg="6" md="12" className="text-center align-middle">
            <Members />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="6" md="12">
            <ProductDev/>
          </Col>
          <Col lg="6" md="12" className="text-center align-middle">
            <Members />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Home