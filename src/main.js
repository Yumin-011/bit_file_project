import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <div class="header-overlay"></div>
      <h1>Premier League 2024-25</h1>
    </header>
    
    <main class="main-content">
      <div class="teams-grid" id="teamsGrid">
        <!-- Teams will be dynamically loaded here -->
      </div>
    </main>
  </div>
`

// EPL Teams Data 2024-25 Season
const eplTeams = [
  { name: 'Liverpool', city: 'Liverpool', stadium: 'Anfield', logo: 'hum.png', rank: 1, pageUrl: 'Liverpool.html' },
  { name: 'Arsenal', city: 'London', stadium: 'Emirates Stadium', logo: 'ars.png', rank: 2, pageUrl: 'Arsenal.html' },
  { name: 'Manchester City', city: 'Manchester', stadium: 'Etihad Stadium', logo: 'joat.png', rank: 3, pageUrl: 'Manchester_City.html' },
  { name: 'Chelsea', city: 'London', stadium: 'Stamford Bridge', logo: 'chelsi.png', rank: 4, pageUrl: 'Chelsea.html' },
  { name: 'Newcastle United', city: 'Newcastle', stadium: "St James' Park", logo: 'new.png', rank: 5, pageUrl: 'Newcastle_United.html' },
  { name: 'Aston Villa', city: 'Birmingham', stadium: 'Villa Park', logo: 'vila.png', rank: 6, pageUrl: 'Aston_Villa.html' },
  { name: 'Nottingham Forest', city: 'Nottingham', stadium: 'City Ground', logo: 'forest.png', rank: 7, pageUrl: 'Nottingham_Forest.html' },
  { name: 'Brighton & Hove Albion', city: 'Brighton', stadium: 'Amex Stadium', logo: 'briton.png', rank: 8, pageUrl: 'Brighton&Hove_Albion.html' },
  { name: 'AFC Bournemouth', city: 'Bournemouth', stadium: 'Vitality Stadium', logo: 'born.png', rank: 9, pageUrl: 'AFC_Bournemouth.html' },
  { name: 'Brentford', city: 'London', stadium: 'Gtech Community Stadium', logo: 'port.png', rank: 10, pageUrl: 'Brentford.html' },
  { name: 'Fulham', city: 'London', stadium: 'Craven Cottage', logo: 'full.png', rank: 11, pageUrl: 'Fulham.html' },
  { name: 'Crystal Palace', city: 'London', stadium: 'Selhurst Park', logo: 'cristal.png', rank: 12, pageUrl: 'Crystal_palace.html' },
  { name: 'Everton', city: 'Liverpool', stadium: 'Goodison Park', logo: 'everton.png', rank: 13, pageUrl: 'Everton.html' },
  { name: 'West Ham United', city: 'London', stadium: 'London Stadium', logo: 'west.png', rank: 14, pageUrl: 'West_Ham_United.html' },
  { name: 'Manchester United', city: 'Manchester', stadium: 'Old Trafford', logo: 'manu.png', rank: 15, pageUrl: 'Manchester_United.html' },
  { name: 'Wolverhampton', city: 'Wolverhampton', stadium: 'Molineux Stadium', logo: 'wolf.png', rank: 16, pageUrl: 'Wolverhampton.html' },
  { name: 'Tottenham Hotspur', city: 'London', stadium: 'Tottenham Hotspur Stadium', logo: 'dak.png', rank: 17, pageUrl: 'Tottenham_Hotspur.html' },
  { name: 'Leicester City', city: 'Leicester', stadium: 'King Power Stadium', logo: 'fox.png', rank: 18, pageUrl: 'Leicester_City.html' },
  { name: 'Ipswich Town', city: 'Ipswich', stadium: 'Portman Road', logo: 'witch.png', rank: 19, pageUrl: 'Ipswich_Town.html' },
  { name: 'Southampton', city: 'Southampton', stadium: "St Mary's Stadium", logo: 'soton.png', rank: 20, pageUrl: 'Southampton.html' }
];

// Team data
const teams = [
    {
        id: 'manchester-city',
        name: 'Manchester City',
        logo: 'https://resources.premierleague.com/premierleague/badges/t43.png'
    },
    {
        id: 'arsenal',
        name: 'Arsenal',
        logo: 'https://resources.premierleague.com/premierleague/badges/t3.png'
    },
    {
        id: 'manchester-united',
        name: 'Manchester United',
        logo: 'https://resources.premierleague.com/premierleague/badges/t1.png'
    },
    {
        id: 'liverpool',
        name: 'Liverpool',
        logo: 'https://resources.premierleague.com/premierleague/badges/t14.png'
    },
    {
        id: 'chelsea',
        name: 'Chelsea',
        logo: 'https://resources.premierleague.com/premierleague/badges/t8.png'
    }
];

// Render teams in the teams container
function renderTeams() {
  const teamsGrid = document.getElementById('teamsGrid');
  teamsGrid.innerHTML = eplTeams.map(team => `
    <div class="team-card" data-team-url="teams/${team.pageUrl}">
      <div class="team-logo">
        <img src="/images/${team.logo}" alt="${team.name} logo">
      </div>
      <div class="team-info">
        <h2>${team.name}</h2>
        <p class="rank"><strong>Rank:</strong> #${team.rank}</p>
        <p><strong>City:</strong> ${team.city}</p>
        <p><strong>Stadium:</strong> ${team.stadium}</p>
      </div>
    </div>
  `).join('');

  // 팀 카드 클릭 이벤트 추가
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('click', () => {
      const teamUrl = card.dataset.teamUrl;
      window.location.href = teamUrl;
    });
  });
}

// Get team stats from localStorage
function getTeamStats(teamId) {
    const stats = localStorage.getItem(`team_stats_${teamId}`);
    return stats ? JSON.parse(stats) : { follows: 0, likes: 0, views: 0 };
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderTeams();
});

// Team interaction tracking
class TeamInteractionTracker {
  constructor() {
    this.teams = {};
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem('teamInteractions');
    if (saved) {
      this.teams = JSON.parse(saved);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('teamInteractions', JSON.stringify(this.teams));
  }

  likeTeam(teamId) {
    if (!this.teams[teamId]) {
      this.teams[teamId] = { likes: 0, views: 0, follows: 0 };
    }
    this.teams[teamId].likes++;
    this.saveToLocalStorage();
    this.updateUI(teamId);
  }

  followTeam(teamId) {
    if (!this.teams[teamId]) {
      this.teams[teamId] = { likes: 0, views: 0, follows: 0 };
    }
    this.teams[teamId].follows++;
    this.saveToLocalStorage();
    this.updateUI(teamId);
  }

  trackView(teamId) {
    if (!this.teams[teamId]) {
      this.teams[teamId] = { likes: 0, views: 0, follows: 0 };
    }
    this.teams[teamId].views++;
    this.saveToLocalStorage();
    this.updateUI(teamId);
  }

  getRankings() {
    return Object.entries(this.teams)
      .sort(([, a], [, b]) => 
        (b.likes + b.follows * 2 + b.views * 0.1) - 
        (a.likes + a.follows * 2 + a.views * 0.1)
      );
  }

  updateUI(teamId) {
    // Update team stats display
    const statsElement = document.querySelector(`#team-${teamId}-stats`);
    if (statsElement && this.teams[teamId]) {
      statsElement.innerHTML = `
        <div class="team-stats">
          <span>👍 ${this.teams[teamId].likes}</span>
          <span>👥 ${this.teams[teamId].follows}</span>
          <span>👀 ${this.teams[teamId].views}</span>
        </div>
      `;
    }

    // Update rankings
    this.updateRankings();
  }

  updateRankings() {
    const rankingsContainer = document.querySelector('.ranking-stats');
    if (rankingsContainer) {
      const rankings = this.getRankings();
      rankingsContainer.innerHTML = rankings
        .slice(0, 10)
        .map(([teamId, stats], index) => `
          <div class="ranking-item">
            <span class="rank">#${index + 1}</span>
            <span class="team-name">${teamId}</span>
            <span class="stats">
              👍 ${stats.likes} | 
              👥 ${stats.follows} | 
              👀 ${stats.views}
            </span>
          </div>
        `)
        .join('');
    }
  }
}

// Initialize tracker
const tracker = new TeamInteractionTracker();

// Example poll creation
function createPoll(question, options) {
  const pollsContainer = document.querySelector('.current-polls');
  if (!pollsContainer) return;

  const pollElement = document.createElement('div');
  pollElement.className = 'poll';
  pollElement.innerHTML = `
    <h3>${question}</h3>
    <div class="poll-options">
      ${options.map(option => `
        <button class="poll-option" data-option="${option}">
          ${option}
          <span class="vote-count">0</span>
        </button>
      `).join('')}
    </div>
  `;

  pollsContainer.appendChild(pollElement);

  // Add click handlers for poll options
  pollElement.querySelectorAll('.poll-option').forEach(button => {
    button.addEventListener('click', (e) => {
      const option = e.target.closest('.poll-option');
      const count = option.querySelector('.vote-count');
      count.textContent = parseInt(count.textContent) + 1;
      
      // Disable all options after voting
      pollElement.querySelectorAll('.poll-option').forEach(btn => {
        btn.disabled = true;
      });
    });
  });
}

// Create some example polls
document.addEventListener('DOMContentLoaded', () => {
  createPoll(
    "Which team will win the Premier League this season?",
    ["Manchester City", "Arsenal", "Liverpool", "Manchester United", "Chelsea"]
  );

  createPoll(
    "Best signing of the season?",
    ["Declan Rice", "Alexis Mac Allister", "Mason Mount", "Kai Havertz"]
  );
});

// 필요한 경우 여기에 추가 JavaScript 코드를 작성할 수 있습니다.

