import classNames from 'classnames/bind';
import styles from './Home.scss';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';

const cx = classNames.bind(styles);

function Home() {
    const data = [
        { No: 1, Tên: 'Tùng', Email: 'tu*****on@gmail.com', Score: 85 },
        { No: 2, Tên: 'Công', Email: 'nguy****ng@gmail.com', Score: 92 },
        { No: 3, Tên: 'Trung', Email: 'trun****yen@gmail.com', Score: 78 },
        { No: 4, Tên: 'Văn', Email: 'van****yen@gmail.com', Score: 89 },
    ];
    return (
        <div className={cx('wapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>Lịch sử đất nước</div>
                    <div className={cx('poster')}>
                        <img
                            src="https://giasuviet.com.vn/wp-content/uploads/2015/09/phuong-phap-hoc-mon-lich-su-lop-12-hieu-qua-va-nho-lau.jpg"
                            alt="img"
                        />
                        <div className={cx('details')}>
                            <span>Lịch sử đất nước Việt Nam thời kỳ Đại Cồ Việt</span>
                            <p>20-12-2022</p>
                        </div>
                    </div>
                </div>
                <div className={cx('rank')}>
                    <div className={cx('header')}>
                        <span className={cx('title')}>BXH</span>
                        <div className={cx('button')}>
                            <Button small> Tháng </Button>
                            <Button small> Tổng </Button>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tên</th>
                                    <th>Email</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr className={cx('table-tr')} key={item.No}>
                                        <td>{item.No}</td>
                                        <td>{item.Tên}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
