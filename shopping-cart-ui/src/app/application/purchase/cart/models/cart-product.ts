import { Product } from '../../../dashboard/product-list/models/product.model';
import { ProductDetail } from '../../../dashboard/product-detail/models/productDetail';

export class CartProduct {
id?: number;
product?: ProductDetail;
quantity?: number;
}
