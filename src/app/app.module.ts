import { NgModule } from '@angular/core';

//Modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http'

//Angular material
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

//Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//Services
import { AuthService } from './services/auth.service';

//Environment
import { environment } from 'src/environments/environment';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      closeButton: true,
      preventDuplicates: false,
    }),
    MatRadioModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
  ],
  exports: [RouterModule],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

