import style from './cartsum.module.css';
export default function cartSummary() {
    return (
        <div className={style.cartsumm}>
            <h2 className={style.head}>Cart Summary</h2>
            <div className={style.itemslist}>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                <p>hajsas</p>
                
            </div>
            <div className={style.total}>
                <h2>Total</h2>
                <h2>Rs. 1000</h2>
            </div>
            <button className={style.paymentbtn}>Payment Transcation</button>
        </div>
    );
}