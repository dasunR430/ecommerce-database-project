import style from './cartsum.module.css';
import Card from "./cartitem";
export default function cartSummary() {
    return (
        <div className={style.cartsumm}>
            <h2 className={style.head}>Cart Summary</h2>
            <div className={style.itemslist}>
                <Card product={{title: "Product 1", price: "Rs. 100"}} />
                <Card product={{title: "Product 1", price: "Rs. 100"}} />
                <Card product={{title: "Product 1", price: "Rs. 100"}} />
                <Card product={{title: "Product 1", price: "Rs. 100"}} />
            </div>
            <div className={style.discount}>
                <h2>Discount</h2>
                <h2>Rs. 100</h2>
            </div>

            
            
                <div className={style.total}>
                    <h2>Total Rs. 1000</h2>
                </div>
          
        </div>
    );
}