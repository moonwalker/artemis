import styles from './rating.module.css'

export default function Rating({ rating, reviews }) {
  return (
    <div className={styles.rating}>
      <div className={styles.rate}>
        <span>({rating})</span>
        <input type="radio" id="star5" name="rate" value="5" defaultChecked={rating > 4.5 ? 'checked' : ''} />
        <label htmlFor="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" defaultChecked={4.5 >= rating && rating > 3.5 ? 'checked' : ''} />
        <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" defaultChecked={3.5 >= rating && rating > 2.5 ? 'checked' : ''} />
        <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" defaultChecked={2.5 >= rating && rating  > 1.5 ? 'checked' : ''} />
        <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" defaultChecked={1.5 >= rating && rating > .5 ? 'checked' : ''} />
        <label htmlFor="star1" title="text">1 star</label>
      </div>
      <div className={styles.text}><strong>{reviews}</strong> reviews</div>
    </div>
  )
}
