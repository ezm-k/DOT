'use strict';

$(function () {
    
    let mainvisualInner = $('#mainvisual .inner')
    let windowTarget = $(window);
    /*=================================================
    mainvisual　ふわっと表示
    ===================================================*/
    mainvisualInner.on('inview', function (event, isInView) {
        if (isInView) {
            mainvisualInner.stop().addClass('fadeUp');
        }
    });

    /*=================================================
    feature & function　要素を順番にふわっと表示
    ===================================================*/
    windowTarget.scroll(function () {
        delayScrollAnime();/* アニメーション用の関数を呼ぶ*/
    });


    /*=================================================
    要素を順番にふわっと表示させる共通処理
    ===================================================*/
    function delayScrollAnime() {
        let time = 0.2; //遅延時間
        let value = time;

        //該当クラスの付く要素に対し、順番に次の処理をする
        $('.delayScroll').each(function () {
            let parent = this; //親要素を取得
            let position = $(this).offset().top; //ページ最上部から見た親要素のY軸の位置を取得
            let scroll = windowTarget.scrollTop(); //スクロール量を取得
            let windowHeight = windowTarget.height(); //画面の高さを取得
            let childs = $(this).children(); //子要素を取得

            //スクロール量が要素の位置を過ぎたとき、なおかつ、親要素がplayクラスを持っていない場合
            if (scroll >= position - windowHeight + 300 && !$(parent).hasClass('play')) {

                //子要素に対し次の処理
                childs.each(function () {
                    //アニメーションのクラスがついていなければ
                    if (!$(this).hasClass('fadeUp')) {
                        $(parent).addClass('play'); //親要素にplayクラス付与
                        $(this).css('animation-delay', value + 's'); //子要素にアニメーションを遅延するCSSを追加
                        $(this).addClass('fadeUp'); //子要素にアニメーションのクラス名を追加
                        value = value + time; //処理ごとに遅延時間を0.5秒増やす

                        // 現在処理している子要素の順番を取得。
                        let index = childs.index(this);

                        // もし子要素がこれ以上なければ
                        // 子要素全てに処理を終えたら
                        if ((childs.length - 1) == index) {
                            //playクラスを外す。
                            $(parent).removeClass('play');
                        }
                    }
                })
            } else {
                // 子要素からアニメーションクラスを外し
                childs.removeClass('fadeUp');
                // delayは初期値に戻す。
                value = time;
            }
        });//ふわっと表示させる共通処理
    }

});