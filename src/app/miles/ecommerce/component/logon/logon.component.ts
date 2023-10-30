import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormService } from '../../service/form.service';

declare var $:any;
@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {
  public required_fields  = new Array("email","senha");
  constructor(
    public auth_service:AuthService,
    public form_service:FormService,
  ) { }

  ngOnInit(): void {
  }

  logar()
  {    
    $("#div-response-logon").hide();
    if (!this.validar()) {
        return;
    }

    this.auth_service
    .logon($("#email").val(),$("#senha").val())
    .subscribe(
      (response:any) => {
        if (response.status == 'success'){
          this.auth_service.setAuth(response.data);
        }else{
          $("#div-response-logon").addClass("alert alert-danger");
          $("#div-response-logon").attr('role','alert');
          $("#div-response-logon").html(response.msg);
          $("#div-response-logon").show();
        }
      }
    );
  }

  validar():boolean {
    let is_valid  = true;
		this.required_fields.forEach((campo:string) => {
			if ($("#" + campo).val() == ""){
        this.form_service.setError(campo);
			 	setTimeout(function(){
			 		$("#" + campo).focus();
			 	},100);
        is_valid = false;
        return;
			}else{
        this.form_service.setDefault(campo);
      }
    });

    if (!is_valid) return false;
		return true;
	}
}
