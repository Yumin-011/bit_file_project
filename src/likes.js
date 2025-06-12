import { supabase } from './supabase.js';

// 응원 수 가져오기
async function getCheerCount(clubName) {
    const { data, error } = await supabase
        .from('clubs_stats')
        .select('cheers_count')
        .eq('club_name', clubName)
        .maybeSingle();

    if (error) {
        console.error('Error fetching cheer count:', error);
        return 0;
    }

    return data?.cheers_count || 0;
}

// 응원 수 업데이트
async function updateCheerCount(clubName) {
    const { data, error } = await supabase.rpc('increment_cheers', {
        club_name_param: clubName
    });

    if (error) {
        console.error('Error updating cheer count:', error);
        return false;
    }

    return true;
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    const cheerButton = document.querySelector('.cheer-button');
    const cheerCount = document.querySelector('.cheer-count');
    const teamName = document.querySelector('.team-name').textContent;
    const clubName = window.location.pathname.split('/').pop().replace('.html', '');

    // 초기 응원 수 설정
    const initialCount = await getCheerCount(clubName);
    cheerCount.textContent = initialCount;

    // 응원하기 버튼 클릭 이벤트
    cheerButton.addEventListener('click', async () => {
        // 버튼 비활성화 (중복 클릭 방지)
        cheerButton.disabled = true;

        // 응원 수 업데이트
        const success = await updateCheerCount(clubName);
        
        if (success) {
            // 화면에 표시된 카운트 업데이트
            const currentCount = parseInt(cheerCount.textContent);
            cheerCount.textContent = currentCount + 1;
            
            // 클릭 효과 애니메이션
            cheerButton.classList.add('cheering');
            setTimeout(() => {
                cheerButton.classList.remove('cheering');
            }, 200);
        }

        // 버튼 다시 활성화
        cheerButton.disabled = false;
    });
}); 