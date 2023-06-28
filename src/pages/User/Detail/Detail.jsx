import classNames from 'classnames/bind';
import styles from './Detail.scss';

const cx = classNames.bind(styles);

function Detail() {
    const data = [
        { ID: 1, Tên: 'Tùng', Gender: 'Nam', Born: '11/11/2001', Email: 'tun****on*gmail.com' },
    ];
    return (
        <div className={cx('wapper-detail')}>
            <div className={cx('inner-detail')}>
                <div className={cx('title-detail')}>
                    <nav class="">
                        <div>
                            <h2 class="nav_title c1">Trung tâm cá nhân</h2>
                            <ul>
                                <li class="selected ">
                                    <a class="title-content" href="/detail">
                                    <span>Thông tin của tôi</span>
                                    </a>
                                </li>
                                <li class="unselected ">
                                    <a class="title-content" href="/achievements">
                                    <span>Thành tích của tôi</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className={cx('content-detail')}>
                    <div className={cx('info-detail')}>
                        <img
                            src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg"
                            alt="img"
                        />
                        <div className={cx('body-detail')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>ID :</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr className={cx('table-tr')} key={item.No}>
                                            <td>{item.ID}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Tên :</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr className={cx('table-tr')} key={item.No}>
                                            <td>{item.Tên}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Giới tính :</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr className={cx('table-tr')} key={item.No}>
                                            <td>{item.Gender}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Ngày sinh :</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr className={cx('table-tr')} key={item.No}>
                                            <td>{item.Born}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Email :</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr className={cx('table-tr')} key={item.No}>
                                            <td>{item.Email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
