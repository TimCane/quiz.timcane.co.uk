import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { QuizApiClientService } from './api-client.service';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    QuizApiClientService
  ]
})
export class ApiClientModule { }
