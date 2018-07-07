import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlConstants } from '../../../../shared/models/UrlConstants';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  parentAddressType: string;
  constructor(private router: ActivatedRoute) {
    this.parentAddressType = UrlConstants.VALUE_SHIPPING;
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.parentAddressType = params.get('addressType');
    });
  }
}
