import classNames from 'classnames/bind';
import styles from './Achievements.scss';

const cx = classNames.bind(styles);

function Achievements() {
    const data = [
        { Name: 'Tùng', Detail: '1231231', Date: '11/11/2022', Score: 85 },
        { Name: 'Tùng', Detail: '1231231', Date: '11/11/2022', Score: 85 },
        { Name: 'Tùng', Detail: '1231231', Date: '11/11/2022', Score: 85 },
        { Name: 'Tùng', Detail: '1231231', Date: '11/11/2022', Score: 85 },
        { Name: 'Tùng', Detail: '1231231', Date: '11/11/2022', Score: 85 },
    ];
    return (
        <div className={cx('wapper-achievements')}>
            <div className={cx('inner-achievements')}>
                <div className={cx('title-achievements')}>
                    <nav class="">
                        <div>
                            <h2 class="nav_title c1">Trung tâm cá nhân</h2>
                            <ul>
                                <li class="unselected ">
                                    <a class="title-content" href="/detail">
                                    <span>Thông tin của tôi</span>
                                    </a>
                                </li>
                                <li class="selected ">
                                    <a class="title-content" href="/achievements">
                                    <span>Thành tích của tôi</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className={cx('content-achievements')}>
                    <div className={cx('info-achievements')}>
                        <table className={cx('table')}>
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Thông tin</th>
                                    <th>Ngày</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr className={cx('table-tr')} key={item.No}>
                                        <td>{item.Name}</td>
                                        <td>{item.Detail}</td>
                                        <td>{item.Date}</td>
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

export default Achievements;
