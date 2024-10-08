import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  addMsg: string | undefined;
  constructor(private products: ProductsService, private fb: FormBuilder) {}
  form = this.fb.group({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl('', Validators.required),
    productColor: new FormControl('', Validators.required),
    productCategory: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
    productURL: new FormControl('', Validators.required),
  })
  submitProduct() {
    if (this.form.valid) {
      this.products.addProduct(this.form.value).subscribe(result => {
        if (result) {
          this.addMsg = "Successfully Product Added"
        }
        setTimeout(() => (this.addMsg = undefined), 4000);
      })
      this.form.reset();

    } else {
      alert("something error")
    }

  }


// submitProductV2() {
//   if (!this.form.valid) {
//     alert("something error")
//   }
//   this.apiHelper.post(this.form.value, ApiEndPoints.products).subscribe((res) => {
//     if (res) {
//       this.addMsg = "Successfully Product Added"
//     }
//     setTimeout(() => (this.addMsg = undefined), 4000);

//     this.form.reset();
//   })
// }
  
}
