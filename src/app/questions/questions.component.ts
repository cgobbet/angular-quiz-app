import { Answers, Choice, Question, Quiz } from "../../quiz.model";
import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { QuestionsService } from "../questions.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public quiz: Quiz;
  public answers: Answers;
  public questions: Question[];
  public currentQuestionIndex: number;

  public showResults = false;

  // The code for rendering your quiz questions starts from the constructor() method
  // inject both the active route and the questions service
  constructor(
    public route: ActivatedRoute,
    public questionsService: QuestionsService
  ) {}

  ngOnInit() {
    // read from the dynamic route and load the proper quiz data
    this.questionsService.getQuestions(this.route.snapshot.params.quizId)
      .subscribe(questions => {
        // initialize everything
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }
}
