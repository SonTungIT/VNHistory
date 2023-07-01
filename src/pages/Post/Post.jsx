import classNames from 'classnames/bind';
import styles from './Post.scss';
import config from '~/config';
import Button from '~/components/GlobalStyles/Layout/components/Button';

import React, { useState } from 'react';



const cx = classNames.bind(styles);

function Post() {

        const [isToggled1, setIsToggled1] = useState(false);
        const [isToggled2, setIsToggled2] = useState(false);
      
        const handleToggle1 = () => {
          setIsToggled1(!isToggled1);
        };
        const handleToggle2 = () => {
            setIsToggled2(!isToggled2);
          };
    return (
        <div className={cx('wapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <div className={cx('title-post')}>Lịch sử đất nước Việt Nam thời kỳ Đại Cồ Việt</div>
                        <p className={cx('title-date')}>20-12-2022</p>
                    </div>
                    <div className={cx('poster')}>
                        <img
                            src="https://giasuviet.com.vn/wp-content/uploads/2015/09/phuong-phap-hoc-mon-lich-su-lop-12-hieu-qua-va-nho-lau.jpg"
                            alt="img"
                        />
                    </div>
                    <div className={cx('detail-post')}>Thời kỳ Hồng Bàng theo truyền thuyết và dã sử cho rằng bắt đầu từ năm 2879 TCN, là niên đại của Kinh Dương Vương, 
                        với quốc hiệu Xích Quỷ. Lãnh thổ của quốc gia dưới thời Kinh Dương vương rộng lớn, phía bắc tới sông Dương Tử 
                        (cả vùng hồ Động Đình), phía nam tới nước Hồ Tôn (Chiêm Thành), phía đông là Đông Hải (một phần của Thái Bình Dương), 
                        phía tây là Ba Thục (Tứ Xuyên, Trung Hoa ngày nay). Về sau người Việt chỉ thấy có ở miền Bắc Việt Nam ngày nay, có thể 
                        một phần do sự lấn áp của các tộc người Hoa Hạ từ phương Bắc.
                    </div>

                    <div className={cx('dropdown')}>
                        <button className={cx('btn')} type="button">
                            Quiz
                        </button>
                        <ul className={cx('dropdown-menu')}>
                            <div className={cx('quiz')}>
                                <div className={cx('title-quiz')}>Lịch sử đất nước Việt Nam thời kỳ Đại Cồ Việt</div>
                                <div className={cx('establish-quiz')}>Thiết lập bài kiểm tra</div>
                                <div className={cx('number-quiz')}>Câu hỏi (tối đa) - Thời gian</div>
                                <div className={cx('btn-quiz')}>
                                    <a href='/Quiz10'>
                                        <button className={cx('btn-quiz10')}>10 câu - 135 giây</button>
                                    </a>
                                    <a href='/Quiz20'>
                                        <button className={cx('btn-quiz20')}>20 câu - 270 giây</button>
                                    </a>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
