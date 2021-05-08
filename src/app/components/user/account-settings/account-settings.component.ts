import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { UserService } from '../../../services/user.service';
import { DialogService } from '../../../services/dialog.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.sass']
})
export class AccountSettingsComponent implements OnInit {

  user: any;
  editMode = false;
  editAccountMode = false;
  editPaymentMode = false;
  editThemingMode = false;
  editLayoutMode = false;

  userForm = new FormGroup({
    name: new FormControl({value: null, disabled: true}),
    password: new FormControl({value: null, disabled: true}),
    confirmPassword: new FormControl({value: null, disabled: true}),
    paymentMethod: new FormGroup({
      ownerName: new FormControl(null),
      cardNumber: new FormControl(null),
      ccv: new FormControl(null),
      expDate: new FormControl(null, [Validators.minLength(4), Validators.maxLength(4)])
    }),
    settings: new FormGroup({
      theme: new FormControl(null),
      editorLayout: new FormControl(null)
    })
  });

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
      .subscribe( res => {
        console.log(res);
        this.user = res;
        this.userForm.patchValue({
          name: this.user.name,
          paymentMethod: {
            ownerName: this.user.paymentMethod.ownerName,
            cardNumber: this.user.paymentMethod.cardNumber,
            ccv: this.user.paymentMethod.ccv,
            expDate: this.user.paymentMethod.expDate                        
          },
          settings: {
            theme: this.user.settings.theme,
            editorLayout: this.user.settings.editorLayout
          }
         });
      }, err => {
        console.log(err);
      });
  }

  get name(): AbstractControl {return this.userForm.get('name');} 
  get password(): AbstractControl {return this.userForm.get('password');} 
  get confirmPassword(): AbstractControl {return this.userForm.get('confirmPassword');} 
  get ownerName(): AbstractControl {return this.userForm.get('paymentMethod').get('ownerName');} 
  get cardNumber(): AbstractControl {return this.userForm.get('paymentMethod').get('cardNumber');} 
  get ccv(): AbstractControl {return this.userForm.get('paymentMethod').get('ccv');} 
  get expDate(): AbstractControl {return this.userForm.get('paymentMethod').get('expDate');} 
  get theme(): AbstractControl {return this.userForm.get('settings').get('theme');} 
  get editorLayout(): AbstractControl {return this.userForm.get('settings').get('editorLayout');} 

  openProfileDialog() {
    this.dialogService.openProfilePicDialog({ profile: this.user.profile })
      .subscribe(res => {
        console.log(res);
        if (res) {
          this.user.profile = res;
          this.userService.emitUpdatedProfile(res);
        }
      });
  }

  setEditAccountMode() {
    this.editAccountMode = !this.editAccountMode;

    if(this.editAccountMode) {
      this.name.enable();
      this.password.enable();
      this.confirmPassword.enable();
    } else {
      this.name.disable();
      this.password.disable();
      this.confirmPassword.disable();
    }
  }

  setEditPaymentMode() {
    this.editPaymentMode = !this.editPaymentMode;

    if(this.editPaymentMode) {
      this.ownerName.enable();
      this.cardNumber.enable();
      this.ccv.enable();
      this.expDate.enable();
    } else {
      this.ownerName.disable();
      this.cardNumber.disable();
      this.ccv.disable();
      this.expDate.disable();
    }
  }

  setEditThemingMode() {
    this.editThemingMode = !this.editThemingMode;

    if(this.editThemingMode) {
      this.theme.enable();      
    } else {
      this.theme.disable();
    }
  }

  setEditLayoutMode() {
    this.editLayoutMode = !this.editLayoutMode;

    if(this.editLayoutMode) {
      this.editorLayout.enable();      
    } else {
      this.editorLayout.disable();
    }
  }
  
  setAppTheme() {
    console.log("Selected Theme: ", this.theme.value);
    this.navigationService.setTheme(this.theme.value);
  }

}
