/**
 * MYアルバム - アーティストアプリ 洗練版ロジック
 */

document.addEventListener('DOMContentLoaded', () => {
    // ページ遷移時のスクロール調整
    window.scrollTo(0, 0);

    // オンボーディングの進行管理
    const nextBtns = document.querySelectorAll('.btn-next');
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.onboarding-step');
            const nextStepId = btn.dataset.next;
            const nextStep = document.getElementById(nextStepId);
            
            if (nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            }
        });
    });

    const backBtns = document.querySelectorAll('.btn-back');
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.onboarding-step');
            const prevStepId = btn.dataset.prev;
            const prevStep = document.getElementById(prevStepId);
            
            if (prevStep) {
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
            }
        });
    });

    // モーダルクリックで閉じる
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});

/**
 * 初期登録の完了処理
 */
function completeOnboarding() {
    console.log('Completing onboarding...');
    showToast('アーティスト登録が完了しました！');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

/**
 * レビュー詳細モーダルを開く
 */
function openReviewDetails(curatorName, status, imgSeed) {
    const modal = document.getElementById('reviewModal');
    const mImg = modal.querySelector('.modal-img');
    const mName = modal.querySelector('.modal-curator-name');
    const mBadge = modal.querySelector('.modal-status-badge');
    
    mImg.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${imgSeed}`;
    mName.textContent = curatorName;
    
    // Status handling
    mBadge.className = 'badge';
    if (status === 'god') {
        mBadge.classList.add('badge-god');
        mBadge.textContent = '神認定';
    } else if (status === 'uncertified') {
        mBadge.classList.add('badge-uncertified');
        mBadge.textContent = '未認定';
    } else {
        mBadge.classList.add('badge-unconfirmed');
        mBadge.textContent = '未確認';
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('reviewModal').style.display = 'none';
}

/**
 * 神認定 / 未認定の更新
 */
function updateReviewStatus(status, contentId) {
    console.log(`Setting status to ${status} for ${contentId}`);
    
    // UI反映（シミュレーション）
    if (status === 'god') {
        showToast('✨ 神コンテンツに認定しました！');
    } else {
        showToast('設定を更新しました');
    }
    
    // 実際にはAPIでバックエンドを更新
    closeModal();
    
    // 一覧側のバッジ等を更新する処理をここに追加可能
}

/**
 * 汎用トースト表示
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(28,28,30,0.95)',
        color: '#fff',
        padding: '14px 24px',
        borderRadius: '24px',
        fontSize: '14px',
        fontWeight: '800',
        zIndex: '10000',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        animation: 'fadeInUp 0.3s ease'
    });
    
    // Animation keyframe would normally be in CSS
    const style = document.createElement('style');
    style.innerHTML = `@keyframes fadeInUp { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }`;
    document.head.appendChild(style);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

/**
 * 画像アップロードプレビュー
 */
function previewImage(input, targetId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const target = document.getElementById(targetId);
            if (target) target.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * URLコピー
 */
function copyInviteLink() {
    const link = 'https://myalbum.app/invite/aoi-kumi-123';
    navigator.clipboard.writeText(link).then(() => {
        if (typeof t === 'function') {
            showToast(t('inv_msg_copy'));
        } else {
            showToast('招待URLをコピーしました！');
        }
    });
}

/**
 * タブ切り替え
 */
function switchTab(tabId, el) {
    // ボタンの切り替え
    const tabs = el.parentElement.querySelectorAll('.tab-item');
    tabs.forEach(t => t.classList.remove('active'));
    el.classList.add('active');

    // コンテンツの切り替え
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

/**
 * レビュー詳細表示（汎用）
 */
function openReviewDetail(id, type, curator, imgPath, status) {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;

    modal.dataset.currentId = id;
    modal.dataset.currentType = type;
    
    // 生成した画像パスを使用
    modal.querySelector('.modal-img').src = `images/aoi_thumbnails/${imgPath}.png`;
    modal.querySelector('.modal-curator-name').textContent = curator;
    
    const badge = modal.querySelector('.modal-status-badge');
    badge.textContent = status === 'unconfirmed' ? '未確認' : (status === 'god' ? '神認定' : (status === 'approved' ? '許可' : '却下'));
    badge.className = `modal-status-badge badge badge-${status}`;

    // ボタンの出し分け
    const btnContainer = modal.querySelector('.modal-actions');
    btnContainer.innerHTML = '';

    if (type === 'edit') {
        btnContainer.innerHTML = `
            <button class="btn btn-outline" style="flex:1; border-color:var(--danger); color:var(--danger);" onclick="updateStatus('rejected')">却下</button>
            <button class="btn btn-primary" style="flex:1;" onclick="updateStatus('god')">✨ 神として認定</button>
        `;
    } else {
        btnContainer.innerHTML = `
            <button class="btn btn-outline" style="flex:1; border-color:var(--danger); color:var(--danger);" onclick="updateStatus('rejected')">却下</button>
            <button class="btn btn-primary" style="flex:1; background-color:var(--success);" onclick="updateStatus('approved')">許可する</button>
        `;
    }

    modal.style.display = 'flex';
}

/**
 * リスト上のプルダウン変更時の処理
 */
function handleStatusChange(selectElement, id) {
    const status = selectElement.value;
    
    // クラスを更新して色を変える
    selectElement.className = 'status-select status-' + status;
    
    // トースト内容の構築
    const item = document.getElementById(id);
    const title = item ? item.querySelector('.text-xs.font-black').textContent : "コンテンツ";
    
    const labelMap = { unconfirmed: '未確認', god: '神認定', approved: '許可済', rejected: '却下' };
    showToast(`「${title}」を ${labelMap[status]} に変更しました`);

    // 「公式にする」ボタンの表示制御（ファン独自タブのみ）
    if (id.startsWith('fan-')) {
        const btnContainer = document.getElementById('official-' + id);
        if (btnContainer) {
            if (status === 'approved') {
                btnContainer.classList.add('active');
            } else {
                btnContainer.classList.remove('active');
            }
        }
    }
}

function updateStatus(newStatus) {
    const modal = document.getElementById('reviewModal');
    const id = modal.dataset.currentId;

    // UI更新（模擬）
    const item = document.getElementById(id);
    if (item) {
        const selectEl = item.querySelector('.status-select');
        if (selectEl) {
            selectEl.value = newStatus;
            selectEl.className = `status-select status-${newStatus}`;
        }
    }

    const labelMap = { unconfirmed: '未確認', god: '神認定', approved: '許可済', rejected: '却下' };
    showToast(`${labelMap[newStatus]} に更新しました！`);

    // 「公式にする」ボタンの表示制御（ファン独自タブのみ）
    if (id.startsWith('fan-')) {
        const btnContainer = document.getElementById('official-' + id);
        if (btnContainer) {
            if (newStatus === 'approved') {
                btnContainer.classList.add('active');
            } else {
                btnContainer.classList.remove('active');
            }
        }
    }

    closeModal();
}

/**
 * 共有アーカイブへの投稿シミュレーション
 */
function postToSharedArchive(id) {
    const item = document.getElementById(id);
    const btnContainer = document.getElementById('official-' + id);
    if (!btnContainer) return;

    const btn = btnContainer.querySelector('.btn-official');
    if (!btn || btn.classList.contains('posted')) return;

    const title = item.querySelector('.text-xs.font-black').textContent;

    // 投稿アニメーションのシミュレーション
    btn.innerHTML = '<span class="loading-spinner"></span> 投稿中...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '✓ 投稿済';
        btn.classList.add('posted');
        showToast(`「${title}」を共有アーカイブに投稿しました！`);
        
        // 実際にはここでバックエンドにリクエストを送り、
        // 共有アーカイブリストにデータが追加される
    }, 1500);
}
