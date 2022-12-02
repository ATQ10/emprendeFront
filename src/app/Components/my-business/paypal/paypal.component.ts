import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { SuscriptionService } from 'src/service/suscription.service';
import { SuscriptionE } from 'src/entity/suscription';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/service/intercept/auth.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  showSuccess = false;
  public payPalConfig?: IPayPalConfig;
  suscription: SuscriptionE | any;
  constructor(
    private suscriptionService: SuscriptionService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'MXN',
    clientId: 'ARintG1D9oGDhj9sV1iAyf2YOQTUMAnhffrnJUYE0FEI1DCwNPX8xWESBSYertOEL3GwK-o3s6C24VfX',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'MXN',
            value: '30',
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: '30'
              }
            }
          },
          items: [
            {
              name: 'Emprenego Premium',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'MXN',
                value: '30',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
      this.suscription ={
        "idU": "",
        "fechaInicio": "",
        "fechaFinal": "",
        "creado": ""
      };
      this.suscriptionService.createSuscriptionE(this.suscription).subscribe(response =>{
        console.table(response);
        if(response.message == "Suscripcion registrada"){
          this.toastr.success(response.message);
          this.authService.isPremium.next(true);
        }

      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
