const fs = require('fs');

const filePath = "C:/Users/naoki/OneDrive/デスクトップ/Antigravity/MY_Album_prototype_idol_2_jp_en/index.html";
let html = fs.readFileSync(filePath, 'utf8');

if (!html.includes('<script src="lang.js"></script>')) {
    html = html.replace('</head>\n<body>', '</head>\n<body>\n    <script src="lang.js"></script>\n    <div style="position: absolute; top: 16px; right: 16px; display: flex; background: #F2F2F7; border-radius: 20px; padding: 4px; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">\n        <button class="lang-btn active" data-lang="ja" style="border: none; background: #FFF; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: 800; cursor: pointer; color: var(--primary-color); box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: 0.3s;" onclick="setLanguage(\'ja\')">JP</button>\n        <button class="lang-btn" data-lang="en" style="border: none; background: transparent; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: 800; cursor: pointer; color: #8E8E93; transition: 0.3s;" onclick="setLanguage(\'en\')">EN</button>\n    </div>');
}

const replacements = {
    '<title>ログイン & 初期登録 - MYアルバム アーティスト</title>': '<title data-i18n="title">ログイン & 初期登録 - MYアルバム アーティスト</title>',
    '<div class="text-xs font-black" style="color:var(--primary-color); letter-spacing: 2px; margin-top: 4px;">FOR ARTISTS</div>': '<div class="text-xs font-black" style="color:var(--primary-color); letter-spacing: 2px; margin-top: 4px;" data-i18n="app_title_for_artists">FOR ARTISTS</div>',
    '<p class="text-xs" style="color:var(--text-sub); margin-bottom: 8px;">招待されたアーティスト</p>': '<p class="text-xs" style="color:var(--text-sub); margin-bottom: 8px;" data-i18n="invited_artist">招待されたアーティスト</p>',
    '<p class="artist-name">蒼くみ <span style="font-size:14px; color:var(--text-main);">様</span></p>': '<p class="artist-name">蒼くみ <span style="font-size:14px; color:var(--text-main);" data-i18n="artist_name_suffix">様</span></p>',
    '<p class="invite-period">有効期限: 発行日から90日以内 (2026/06/19まで)</p>': '<p class="invite-period" data-i18n="invite_period">有効期限: 発行日から90日以内 (2026/06/19まで)</p>',
    '<h3 class="mb-6 text-center">ログイン / 新規登録</h3>': '<h3 class="mb-6 text-center" data-i18n="login_signup">ログイン / 新規登録</h3>',
    'Googleでログイン\n                </button>': '<span data-i18n="login_google">Googleでログイン</span>\n                </button>',
    'Meta (Facebook) でログイン\n                </button>': '<span data-i18n="login_facebook">Meta (Facebook) でログイン</span>\n                </button>',
    'Meta (Instagram) でログイン\n                </button>': '<span data-i18n="login_instagram">Meta (Instagram) でログイン</span>\n                </button>',

    '<h2 class="mb-2">基本情報の登録</h2>': '<h2 class="mb-2" data-i18n="step1_title">基本情報の登録</h2>',
    '<p class="text-sub mb-6">アーティスト活動に使用する情報を入力してください。</p>': '<p class="text-sub mb-6" data-i18n="step1_desc">アーティスト活動に使用する情報を入力してください。</p>',
    '<label class="label">氏名 <span class="required-tag">必須</span></label>': '<label class="label"><span data-i18n="label_name">氏名</span> <span class="required-tag" data-i18n="tag_required">必須</span></label>',
    'placeholder="氏 (例：蒼)"': 'placeholder="氏 (例：蒼)" data-i18n="placeholder_last_name"',
    'placeholder="名 (例：くみ)"': 'placeholder="名 (例：くみ)" data-i18n="placeholder_first_name"',
    '<div class="text-xs text-sub mt-1">※各10文字以内</div>': '<div class="text-xs text-sub mt-1" data-i18n="note_10chars">※各10文字以内</div>',
    '<label class="label">電話番号 <span class="required-tag">必須</span></label>': '<label class="label"><span data-i18n="label_phone">電話番号</span> <span class="required-tag" data-i18n="tag_required">必須</span></label>',
    'placeholder="例：09000000000"': 'placeholder="例：09000000000" data-i18n="placeholder_phone"',
    '<div class="text-xs text-sub mt-1">※ハイフンなし</div>': '<div class="text-xs text-sub mt-1" data-i18n="note_no_hyphen">※ハイフンなし</div>',
    '<label class="label">Email <span class="required-tag">必須</span></label>': '<label class="label"><span data-i18n="label_email">Email</span> <span class="required-tag" data-i18n="tag_required">必須</span></label>',
    '<label class="label">郵便番号 <span class="required-tag">必須</span></label>': '<label class="label"><span data-i18n="label_zip">郵便番号</span> <span class="required-tag" data-i18n="tag_required">必須</span></label>',
    'placeholder="例：1500001"': 'placeholder="例：1500001" data-i18n="placeholder_zip"',
    '<label class="label">住所 <span class="required-tag">必須</span></label>': '<label class="label"><span data-i18n="label_address">住所</span> <span class="required-tag" data-i18n="tag_required">必須</span></label>',
    'placeholder="例：東京都渋谷区..."': 'placeholder="例：東京都渋谷区..." data-i18n="placeholder_address"',
    '<div class="text-xs text-sub mt-1">※全角半角合計100文字以内</div>': '<div class="text-xs text-sub mt-1" data-i18n="note_100chars">※全角半角合計100文字以内</div>',
    '>次へ進む</button>': ' data-i18n="btn_next">次へ進む</button>',
    
    '<h2 class="mb-2">アルバムの設定</h2>': '<h2 class="mb-2" data-i18n="step2_title">アルバムの設定</h2>',
    '<p class="text-sub mb-6">ファンが目にするアルバムの名前を設定します。</p>': '<p class="text-sub mb-6" data-i18n="step2_desc">ファンが目にするアルバムの名前を設定します。</p>',
    '<label class="label">MYアルバム名 <span class="optional-tag">任意</span></label>': '<label class="label"><span data-i18n="label_album_name">MYアルバム名</span> <span class="optional-tag" data-i18n="tag_optional">任意</span></label>',
    'placeholder="例：蒼くみ推し活HUB"': 'placeholder="例：蒼くみ推し活HUB" data-i18n="placeholder_album_name"',
    '<p class="text-xs text-sub">※後からマイページで変更可能です。</p>': '<p class="text-xs text-sub" data-i18n="note_change_later">※後からマイページで変更可能です。</p>',
    '<p class="text-xs text-sub">※20文字以内</p>': '<p class="text-xs text-sub" data-i18n="note_20chars">※20文字以内</p>',
    '>戻る</button>': ' data-i18n="btn_back">戻る</button>',

    '<h2 class="mb-2">アイコン画像の登録</h2>': '<h2 class="mb-2" data-i18n="step3_title">アイコン画像の登録</h2>',
    '<p class="text-sub mb-6">キュレーターアプリで表示されるアイコンです。</p>': '<p class="text-sub mb-6" data-i18n="step3_desc">キュレーターアプリで表示されるアイコンです。</p>',
    '<p class="text-xs font-black mb-2" style="color:var(--text-main);">📸 アイコン画像の推奨設定</p>': '<p class="text-xs font-black mb-2" style="color:var(--text-main);" data-i18n="icon_rec_title">📸 アイコン画像の推奨設定</p>',
    '<p class="text-xs text-sub leading-relaxed" style="margin-bottom:4px;">・推奨サイズ: 320×320px 以上の正方形 (1:1)</p>': '<p class="text-xs text-sub leading-relaxed" style="margin-bottom:4px;" data-i18n="icon_rec_1">・推奨サイズ: 320×320px 以上の正方形 (1:1)</p>',
    '<p class="text-xs text-sub leading-relaxed" style="margin-bottom:4px;">・ファイル容量: 8MB以内 (JPGまたはPNG)</p>': '<p class="text-xs text-sub leading-relaxed" style="margin-bottom:4px;" data-i18n="icon_rec_2">・ファイル容量: 8MB以内 (JPGまたはPNG)</p>',
    '<p class="text-xs text-sub leading-relaxed" style="font-size:10px; margin-top:8px; display:inline-block; background:#e6f3ff; padding:2px 8px; border-radius:4px; color:#0866FF;">※Instagramプロフィールの最適基準に合わせています</p>': '<p class="text-xs text-sub leading-relaxed" style="font-size:10px; margin-top:8px; display:inline-block; background:#e6f3ff; padding:2px 8px; border-radius:4px; color:#0866FF;" data-i18n="icon_rec_note">※Instagramプロフィールの最適基準に合わせています</p>',

    '<h2 class="mb-2">事務所・マネージャー連絡先</h2>': '<h2 class="mb-2" data-i18n="step4_title">事務所・マネージャー連絡先</h2>',
    '<p class="text-sub mb-4 font-black" style="font-size: 13px;">運営からのお知らせを送付する連絡先を登録できます。</p>': '<p class="text-sub mb-4 font-black" style="font-size: 13px;" data-i18n="step4_desc">運営からのお知らせを送付する連絡先を登録できます。</p>',
    '<p style="font-size: 13px; font-weight: 800; color: #2B6CB0; margin-bottom: 4px;">💡 この項目はスキップ可能です</p>': '<p style="font-size: 13px; font-weight: 800; color: #2B6CB0; margin-bottom: 4px;" data-i18n="step4_skip_title">💡 この項目はスキップ可能です</p>',
    '<p style="font-size: 11px; color: #4A5568; font-weight: 700; line-height: 1.5;">フリーランスの方や、後で登録されたい方は、何も入力せずに一番下の「スキップして完了する」を押すだけで初期登録がすべて完了します！</p>': '<p style="font-size: 11px; color: #4A5568; font-weight: 700; line-height: 1.5;" data-i18n="step4_skip_desc">フリーランスの方や、後で登録されたい方は、何も入力せずに一番下の「スキップして完了する」を押すだけで初期登録がすべて完了します！</p>',
    '<label class="label">事務所名 <span class="optional-tag">任意</span></label>': '<label class="label"><span data-i18n="label_office_name">事務所名</span> <span class="optional-tag" data-i18n="tag_optional">任意</span></label>',
    'placeholder="例：〇〇エンターテインメント"': 'placeholder="例：〇〇エンターテインメント" data-i18n="placeholder_office_name"',
    '<div class="text-xs text-sub mt-1">※全角半角50文字以内</div>': '<div class="text-xs text-sub mt-1" data-i18n="note_50chars">※全角半角50文字以内</div>',
    '<label class="label">担当マネージャー名 <span class="optional-tag">任意</span></label>': '<label class="label"><span data-i18n="label_mgr_name">担当マネージャー名</span> <span class="optional-tag" data-i18n="tag_optional">任意</span></label>',
    'placeholder="氏 (例：佐藤)"': 'placeholder="氏 (例：佐藤)" data-i18n="placeholder_mgr_last"',
    'placeholder="名 (例：太郎)"': 'placeholder="名 (例：太郎)" data-i18n="placeholder_mgr_first"',
    '<label class="label">担当者電話番号 <span class="optional-tag">任意</span></label>': '<label class="label"><span data-i18n="label_mgr_phone">担当者電話番号</span> <span class="optional-tag" data-i18n="tag_optional">任意</span></label>',
    '<label class="label">担当者メールアドレス <span class="optional-tag">任意</span></label>': '<label class="label"><span data-i18n="label_mgr_email">担当者メールアドレス</span> <span class="optional-tag" data-i18n="tag_optional">任意</span></label>',
    '>入力をスキップして次へ進む</button>': ' data-i18n="btn_skip_next">入力をスキップして次へ進む</button>',

    '<h2 class="mb-2">利用プランのご選択</h2>': '<h2 class="mb-2" data-i18n="step5_title">利用プランのご選択</h2>',
    '<p class="text-sub mb-6 text-xs font-black">MYアルバムを快適にご利用いただくためのプランを選択してください。</p>': '<p class="text-sub mb-6 text-xs font-black" data-i18n="step5_desc">MYアルバムを快適にご利用いただくためのプランを選択してください。</p>',
    '<span style="font-size: 14px; font-weight: 900; color: #4A5568;">ベーシック</span>': '<span style="font-size: 14px; font-weight: 900; color: #4A5568;" data-i18n="plan_basic">ベーシック</span>',
    '<span style="font-size: 12px; color: #718096;"> / 月</span>': '<span style="font-size: 12px; color: #718096;" data-i18n="plan_month"> / 月</span>',
    '<div class="text-xs font-bold" style="color: #635BFF;">年間データ転送量上限: 0.5TB</div>': '<div class="text-xs font-bold" style="color: #635BFF;" data-i18n="plan_basic_desc">年間データ転送量上限: 0.5TB</div>',
    '<div class="absolute" style="top:-12px; right:12px; background:var(--primary-color); color:white; font-size:10px; font-weight:800; padding:2px 8px; border-radius:12px;">おすすめ</div>': '<div class="absolute" style="top:-12px; right:12px; background:var(--primary-color); color:white; font-size:10px; font-weight:800; padding:2px 8px; border-radius:12px;" data-i18n="plan_rec">おすすめ</div>',
    '<span style="font-size: 14px; font-weight: 900; color: var(--primary-color);">スタンダード</span>': '<span style="font-size: 14px; font-weight: 900; color: var(--primary-color);" data-i18n="plan_standard">スタンダード</span>',
    '<span style="font-size: 12px; color: var(--text-sub);"> / 月</span>': '<span style="font-size: 12px; color: var(--text-sub);" data-i18n="plan_month"> / 月</span>',
    '<div class="text-xs font-bold" style="color: var(--primary-color);">年間データ転送量上限: 1TB</div>': '<div class="text-xs font-bold" style="color: var(--primary-color);" data-i18n="plan_standard_desc">年間データ転送量上限: 1TB</div>',
    '<span style="font-size: 14px; font-weight: 900; color: #D69E2E;">プレミアム</span>': '<span style="font-size: 14px; font-weight: 900; color: #D69E2E;" data-i18n="plan_premium">プレミアム</span>',
    '<div class="text-xs font-bold" style="color: #D69E2E;">年間データ転送量上限: 2TB</div>': '<div class="text-xs font-bold" style="color: #D69E2E;" data-i18n="plan_premium_desc">年間データ転送量上限: 2TB</div>',
    '<p style="font-size:12px; font-weight:800; color:#2d3748; margin-bottom:12px;">💡 データ転送量についての大切なお知らせ</p>': '<p style="font-size:12px; font-weight:800; color:#2d3748; margin-bottom:12px;" data-i18n="plan_notice_title">💡 データ転送量についての大切お知らせ</p>',
    '<li style="margin-bottom:6px;">データ転送料とは、アルバムへのアップロードやファンによるコンテンツ視聴等で発生する通信量（上り・下りのデータ送信量）です。</li>': '<li style="margin-bottom:6px;" data-i18n="plan_notice_1">データ転送料とは、アルバムへのアップロードやファンによるコンテンツ視聴等で発生する通信量（上り・下りのデータ送信量）です。</li>',
    '<li style="margin-bottom:6px;">万が一、年間の転送量上限を超過した場合でも、オプションで追加チャージが可能です。</li>': '<li style="margin-bottom:6px;" data-i18n="plan_notice_2">万が一、年間の転送量上限を超過した場合でも、オプションで追加チャージが可能です。</li>',
    '<li style="margin-bottom:6px;">上限超過後に追加購入を行わなくても、<strong>1年間は大切なデータを安全に保持</strong>します（期間中のデータ引き出しも適宜可能です）。</li>': '<li style="margin-bottom:6px;" data-i18n="plan_notice_3">上限超過後に追加購入を行わなくても、<strong>1年間は大切なデータを安全に保持</strong>します（期間中のデータ引き出しも適宜可能です）。</li>',
    '<li><span style="color:#E53E3E; font-weight:800;">※ 超過後、1年間一度も追加チャージ等が行われず放置された場合、データは消滅しますのであらかじめご注意ください。</span></li>': '<li><span style="color:#E53E3E; font-weight:800;" data-i18n="plan_notice_4">※ 超過後、1年間一度も追加チャージ等が行われず放置された場合、データは消滅しますのであらかじめご注意ください。</span></li>',
    '>プランを決定して次へ</button>': ' data-i18n="btn_confirm_plan">プランを決定して次へ</button>',

    '<h2 class="mb-2">決済情報のご入力</h2>': '<h2 class="mb-2" data-i18n="step6_title">決済情報のご入力</h2>',
    '<p class="text-sub mb-6 text-xs font-black">選択したプランの決済情報を登録してください。</p>': '<p class="text-sub mb-6 text-xs font-black" data-i18n="step6_desc">選択したプランの決済情報を登録してください。</p>',
    '<p style="font-size: 10px; color: #8e8e93; font-weight: 700; margin-top:8px;">※ いつでも解約可能です</p>': '<p style="font-size: 10px; color: #8e8e93; font-weight: 700; margin-top:8px;" data-i18n="plan_cancel_note">※ いつでも解約可能です</p>',
    '<p style="font-size: 13px; font-weight: 800; color: var(--danger); margin-bottom: 8px;">決済に失敗しました</p>': '<p style="font-size: 13px; font-weight: 800; color: var(--danger); margin-bottom: 8px;" data-i18n="stripe_error_title">決済に失敗しました</p>',
    '<p style="font-size: 11px; color: var(--text-sub); font-weight: 700; line-height: 1.5; margin-bottom: 12px;">クレジットカード情報をご確認ください。どうしても解決しない場合は一旦ダッシュボードへ進み、後ほどマイページからご登録いただけます。</p>': '<p style="font-size: 11px; color: var(--text-sub); font-weight: 700; line-height: 1.5; margin-bottom: 12px;" data-i18n="stripe_error_desc">クレジットカード情報をご確認ください。どうしても解決しない場合は一旦ダッシュボードへ進み、後ほどマイページからご登録いただけます。</p>',
    '>後で決済情報を登録してダッシュボードへ進む</button>': ' data-i18n="btn_stripe_dashboard">後で決済情報を登録してダッシュボードへ進む</button>',
    '>クレジットカード画面を開く</button>': ' data-i18n="btn_stripe_open">クレジットカード画面を開く</button>',
    '<p class="text-center text-xs text-sub mb-2">※ Stripeの安全な決済ページへ遷移します</p>': '<p class="text-center text-xs text-sub mb-2" data-i18n="stripe_safe_note">※ Stripeの安全な決済ページへ遷移します</p>',

    '<div style="font-size:14px; color:#a0aec0; cursor:pointer; font-weight:800;" onclick="document.getElementById(\'mockStripeModal\').classList.remove(\'active\')">キャンセル</div>': '<div style="font-size:14px; color:#a0aec0; cursor:pointer; font-weight:800;" onclick="document.getElementById(\'mockStripeModal\').classList.remove(\'active\')" data-i18n="modal_cancel">キャンセル</div>',
    '<label style="font-size:13px; font-weight:800; color:#4a5568; margin-bottom:8px; display:block;">連絡先情報</label>': '<label style="font-size:13px; font-weight:800; color:#4a5568; margin-bottom:8px; display:block;" data-i18n="modal_contact">連絡先情報</label>',
    'placeholder="メールアドレス"': 'placeholder="メールアドレス" data-i18n="placeholder_email"',
    '<label style="font-size:13px; font-weight:800; color:#4a5568; margin-bottom:8px; display:block;">カード情報</label>': '<label style="font-size:13px; font-weight:800; color:#4a5568; margin-bottom:8px; display:block;" data-i18n="modal_card">カード情報</label>',
    'placeholder="カード番号"': 'placeholder="カード番号" data-i18n="placeholder_card_num"',
    'placeholder="MM / YY"': 'placeholder="MM / YY" data-i18n="placeholder_mmyy"',
    'placeholder="CVC"': 'placeholder="CVC" data-i18n="placeholder_cvc"',
    '<label style="font-size:13px; font-weight:800; color:#4a5568; margin-bottom:8px; display:block;">カード名義人</label>': '<label style="font-size:13px; font-weight:800; color:#4a5568; margin-bottom:8px; display:block;" data-i18n="modal_cardholder">カード名義人</label>',
    'placeholder="TARO YAMADA"': 'placeholder="TARO YAMADA" data-i18n="placeholder_cardholder"',
    '>定期購入を申し込む</button>': ' data-i18n="btn_stripe_pay">定期購入を申し込む</button>',
    '<p style="text-align:center; font-size:11px; color:#a0aec0; margin-top:24px; font-weight:700;">※ これ外部決済ページ（モック）のデモ画面です</p>': '<p style="text-align:center; font-size:11px; color:#a0aec0; margin-top:24px; font-weight:700;" data-i18n="demo_note1">※ これは外部決済ページ（モック）のデモ画面です</p>',
    '<span style="color:#E53E3E; font-size:10px; font-weight:800; cursor:pointer; background:#FFF5F5; padding:4px 8px; border-radius:4px;" onclick="executeMockStripePayment(true)">[デモ用: 決済失敗アクションをテストする]</span>': '<span style="color:#E53E3E; font-size:10px; font-weight:800; cursor:pointer; background:#FFF5F5; padding:4px 8px; border-radius:4px;" onclick="executeMockStripePayment(true)" data-i18n="demo_note2">[デモ用: 決済失敗アクションをテストする]</span>',

    "'10文字以内で入力してください。'": "t('error_10chars')",
    "'11桁以内の数値で入力してください。'": "t('error_11digits')",
    "'数値のみで入力してください。'": "t('error_numeric')",
    "'有効なメールアドレス（@を含む）を入力してください。'": "t('error_email')",
    "'7桁の数値で入力してください。'": "t('error_7digits')",
    "'100文字以内で入力してください。'": "t('error_100chars')",
    "'20文字以内で入力してください。'": "t('error_20chars')",
    "'50文字以内で入力してください。'": "t('error_50chars')",
    "'入力内容で次へ進む'": "t('btn_proceed_input')",
    "'入力をスキップして次へ進む'": "t('btn_skip_next')",
    '"正しいカード番号を入力してください"': "t('error_card_num')",
    "'<span style=\"display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:transparent; animation:spin 0.8s linear infinite;\"></span>処理中...'": "'<span style=\"display:inline-block; width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-radius:50%; border-top-color:transparent; animation:spin 0.8s linear infinite;\"></span>' + t('btn_processing')",
    "'定期購入を申し込む'": "t('btn_stripe_pay')",

    "document.getElementById('display-plan-name').innerText = currentPlanName + 'プラン';": "document.getElementById('display-plan-name').innerText = currentPlanName + t('selected_plan_suffix');",
    "document.getElementById('display-plan-desc').innerText = `年間データ転送量上限: ${currentPlanDesc}`;": "document.getElementById('display-plan-desc').innerText = t('selected_plan_desc_prefix') + currentPlanDesc;",
    "document.getElementById('mock-plan-name').innerText = 'MYアルバム ' + currentPlanName + 'プラン';": "document.getElementById('mock-plan-name').innerText = t('modal_plan_prefix') + currentPlanName + t('selected_plan_suffix');"
};

for (const oldText in replacements) {
    if (html.includes(oldText)) {
        html = html.split(oldText).join(replacements[oldText]);
    }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Update completed.');
