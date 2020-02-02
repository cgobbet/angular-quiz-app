// this is the component API like React's props

import { Component, Input, OnInit } from "@angular/core";

import { Answers } from "../../quiz.model";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent {
  @Input() answers: Answers;
}