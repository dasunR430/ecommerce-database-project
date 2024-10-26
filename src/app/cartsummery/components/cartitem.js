import style from './cartitem.module.css';
export default function cartItem({product}) {
    return (
        <div className={style.cartitem}>
            <div className={style.details}>
                <h3 className={style.title}>{product.title}</h3>
                <p className={style.price}>{product.price}</p>
            </div>
        </div>
    );
}