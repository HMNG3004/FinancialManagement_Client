import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      newestOnTop: true,
    }),
  ],
  exports: [
    ToastrModule
  ]
})
export class ShareModule {
}
