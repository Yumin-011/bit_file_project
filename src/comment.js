import { supabase } from './supabase.js';

// 방명록 기능
document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.querySelector('.messages-container');
    const messageInput = document.getElementById('messageInput');
    const postButton = document.getElementById('postMessage');
    const teamName = document.querySelector('.team-name').textContent;

    // 저장된 메시지 불러오기
    async function loadMessages() {
        try {
            const { data, error } = await supabase
                .from('guestbook_messages')
                .select('content, created_at')
                .eq('team_name', teamName)
                .order('created_at', { ascending: false });

            if (error) throw error;

            messagesContainer.innerHTML = data.map(msg => `
                <div class="message">
                    <div class="message-header">
                        <span class="message-author">Fan</span>
                        <span class="message-time">${new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                    <div class="message-content">${msg.content}</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    // 메시지 저장하기
    async function saveMessage(content) {
        try {
            const { data, error } = await supabase
                .from('guestbook_messages')
                .insert([
                    { 
                        team_name: teamName,
                        content: content
                    }
                ]);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error saving message:', error);
            return false;
        }
    }

    // 초기 메시지 로드
    loadMessages();

    // 메시지 게시 이벤트
    postButton.addEventListener('click', async function() {
        const content = messageInput.value.trim();
        
        if (content) {
            // 버튼 비활성화
            postButton.disabled = true;

            // 메시지 저장
            const success = await saveMessage(content);

            if (success) {
                // 메시지 목록 새로고침
                await loadMessages();
                // 입력 필드 초기화
                messageInput.value = '';
            }

            // 버튼 다시 활성화
            postButton.disabled = false;
        }
    });
}); 