import classNames from 'classnames/bind';
import styles from './Login.scss';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';

const cx = classNames.bind(styles);

function Login() {
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
            <a href='/post'>
                <div className={cx('list-event')}>
                    <img
                        src="https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg"
                        alt="img"
                    />
                    <div className={cx('details-event')}>
                        <span>Bảng đối chiếu các triều đại Việt Nam và các triều đại Trung Quốc</span>
                        <p>Dưới đây chúng tôi giới thiệu Bảng đối chiếu các triều đại Việt Nam với năm dương lịch
                             và các triều đại Trung Quốc là nước láng giềng có quan hệ với lịch sử Việt Nam để bạn đọc tham khảo.</p>
                    </div>
                </div>
            </a>
            <a href='/post'>
                <div className={cx('list-event')}>
                    <img
                        src="https://nguoikesu.com/images/wiki/van-mieu-quoc-tu-giam/c4d16aa217651fc2563093147c224855.jpg"
                        alt="img"
                    />
                    <div className={cx('details-event')}>
                        <span>Danh sách Trạng nguyên Việt Nam</span>
                        <p>Trạng nguyên (chữ Hán: 狀元) là danh hiệu thuộc học vị Tiến sĩ của người đỗ cao nhất trong các khoa 
                            đình thời phong kiến ở Việt Nam của các triều nhà Lý, Trần, Lê, và Mạc, kể từ khi có danh hiệu Tam khôi 
                            dành cho 3 vị trí đầu tiên. Người đỗ Trạng nguyên nói riêng và đỗ tiến sĩ nói chung phải vượt qua 3 kỳ thi: 
                            thi hương, thi hội và thi đình.</p>
                    </div>
                </div>
            </a>
            <a href='/post'>
                <div className={cx('list-event')}>
                    <img
                        src="https://nguoikesu.com/images/wiki/lanh-tho-viet-nam-qua-tung-thoi-ky/07c2ddea0a792eb482ac3a4b5ab760f2.jpg"
                        alt="img"
                    />
                    <div className={cx('details-event')}>
                        <span>Lãnh thổ Việt Nam qua từng thời kỳ</span>
                        <p>Lãnh thổ Việt Nam qua từng thời kỳ là sự biến đổi không gian sinh tồn của người Việt, 
                            thể hiện bởi các triều đại chính thống được công nhận. Nó mang tính chất phức tạp, 
                            lúc bị mất lãnh thổ về các nhà nước khác, lúc xâm chiếm chinh phục được lãnh thổ mới.</p>
                    </div>
                </div>
            </a>
            <a href='/post'>
                <div className={cx('list-event')}>
                    <img
                        src="https://nguoikesu.com/images/wiki/chu-viet-tieng-viet/7a11260bfe022f168fe3999dba77cadc.jpg"
                        alt="img"
                    />
                    <div className={cx('details-event')}>
                        <span>Lịch sử Chữ viết tiếng Việt</span>
                        <p>Tiếng Việt là ngôn ngữ của người Việt và là ngôn ngữ chính thức của Việt Nam. 
                            Trong lịch sử Việt Nam đã có ba loại văn tự được dùng để ghi chép tiếng Việt là chữ Hán, 
                            chữ Nôm và chữ quốc ngữ. Chữ Hán và chữ Nôm là văn tự ngữ tố, mỗi chữ Hán và chữ Nôm biểu thị
                             một hoặc một số âm tiết. Chữ quốc ngữ đã bắt đầu được sử dụng chính thức tại Việt Nam vào đầu thế kỷ XX.</p>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Login;
