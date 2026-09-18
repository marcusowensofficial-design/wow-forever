/**
 * World of Warcraft: Forever - Personal Character & Beta Progress Tracker
 * Manages character build planner, beta checklist milestones, and Guild/Squad Roster
 */

document.addEventListener('DOMContentLoaded', () => {
  initCharacterPlanner();
  initBetaChecklist();
  initSquadRoster();
});

/* ==========================================================================
   1. CHARACTER BUILD PLANNER
   ========================================================================== */
function initCharacterPlanner() {
  const charForm = document.getElementById('character-planner-form');
  if (!charForm) return;

  const charNameInput = document.getElementById('char-name-input');
  const factionSelect = document.getElementById('char-faction-select');
  const raceSelect = document.getElementById('char-race-select');
  const classSelect = document.getElementById('char-class-select');
  const specSelect = document.getElementById('char-spec-select');
  const prof1Select = document.getElementById('char-prof1-select');
  const prof2Select = document.getElementById('char-prof2-select');

  // Load saved character data or provide default
  const savedChar = JSON.parse(localStorage.getItem('wow_forever_character') || 'null') || {
    name: 'Marcus',
    faction: 'Horde',
    race: 'Undead (Forsaken)',
    className: 'Paladin',
    spec: 'Protection (Tank)',
    prof1: 'Blacksmithing',
    prof2: 'Mining'
  };

  // Populate inputs
  if (charNameInput) charNameInput.value = savedChar.name;
  if (factionSelect) factionSelect.value = savedChar.faction;
  if (raceSelect) raceSelect.value = savedChar.race;
  if (classSelect) classSelect.value = savedChar.className;
  if (specSelect) specSelect.value = savedChar.spec;
  if (prof1Select) prof1Select.value = savedChar.prof1;
  if (prof2Select) prof2Select.value = savedChar.prof2;

  renderCharacterSheet(savedChar);

  // Auto-save on change
  [charNameInput, factionSelect, raceSelect, classSelect, specSelect, prof1Select, prof2Select].forEach(element => {
    if (element) {
      element.addEventListener('change', updateCharacter);
      element.addEventListener('input', updateCharacter);
    }
  });

  function updateCharacter() {
    const updated = {
      name: charNameInput.value.trim() || 'Hero of Azeroth',
      faction: factionSelect.value,
      race: raceSelect.value,
      className: classSelect.value,
      spec: specSelect.value,
      prof1: prof1Select.value,
      prof2: prof2Select.value
    };

    localStorage.setItem('wow_forever_character', JSON.stringify(updated));
    renderCharacterSheet(updated);
  }
}

function renderCharacterSheet(char) {
  const sheet = document.getElementById('character-sheet-display');
  if (!sheet) return;

  const factionClass = char.faction.toLowerCase().includes('alliance') ? 'alliance' : 'horde';

  sheet.innerHTML = `
    <div class="char-header">
      <div class="char-title"><strong>${escapeHtml(char.name)}</strong></div>
      <span class="char-faction-pill ${factionClass}">${escapeHtml(char.faction)}</span>
    </div>
    <div class="char-meta-grid">
      <div class="char-meta-item"><strong>Race:</strong> ${escapeHtml(char.race)}</div>
      <div class="char-meta-item"><strong>Class:</strong> ${escapeHtml(char.className)}</div>
      <div class="char-meta-item"><strong>Specialization:</strong> ${escapeHtml(char.spec)}</div>
      <div class="char-meta-item"><strong>Target Bracket:</strong> Beta Phase 1 (Cap 20)</div>
      <div class="char-meta-item"><strong>Primary Prof 1:</strong> ${escapeHtml(char.prof1)}</div>
      <div class="char-meta-item"><strong>Primary Prof 2:</strong> ${escapeHtml(char.prof2)}</div>
    </div>
  `;
}

/* ==========================================================================
   2. BETA PHASE 1 CHECKLIST (LEVEL 20)
   ========================================================================== */
function initBetaChecklist() {
  const checklistContainer = document.getElementById('checklist-items-container');
  if (!checklistContainer) return;

  let completedSet = new Set(JSON.parse(localStorage.getItem('wow_forever_checklist_completed') || '[]'));
  let customTasks = JSON.parse(localStorage.getItem('wow_forever_custom_tasks') || '[]');

  function getAllTasks() {
    return [...WOW_FOREVER_DATA.betaLevel20Checklist, ...customTasks];
  }

  function renderChecklist() {
    const tasks = getAllTasks();
    const completedCount = tasks.filter(t => completedSet.has(t.id)).length;
    const totalCount = tasks.length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const progressFill = document.getElementById('checklist-progress-fill');
    const progressText = document.getElementById('checklist-progress-text');
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${completedCount} of ${totalCount} Milestones (${percent}%)`;

    checklistContainer.innerHTML = tasks.map(task => {
      const isDone = completedSet.has(task.id);
      const isCustom = task.id.startsWith('custom-task-');

      return `
        <div class="checklist-row ${isDone ? 'completed' : ''}" data-task-id="${task.id}">
          <div class="custom-checkbox"></div>
          <span class="checklist-text">${escapeHtml(task.text)}</span>
          <span class="checklist-category-tag">${escapeHtml(task.cat || 'Custom')}</span>
          ${isCustom ? `<button class="delete-task-btn" title="Remove Task" onclick="deleteCustomTask('${task.id}', event)" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1.1rem;padding:0 0.3rem;">✕</button>` : ''}
        </div>
      `;
    }).join('');

    const rows = checklistContainer.querySelectorAll('.checklist-row');
    rows.forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.delete-task-btn')) return;
        const taskId = row.getAttribute('data-task-id');
        toggleTask(taskId);
      });
    });
  }

  function toggleTask(taskId) {
    if (completedSet.has(taskId)) {
      completedSet.delete(taskId);
    } else {
      completedSet.add(taskId);
    }
    localStorage.setItem('wow_forever_checklist_completed', JSON.stringify([...completedSet]));
    renderChecklist();
  }

  window.deleteCustomTask = function(taskId, event) {
    if (event) event.stopPropagation();
    customTasks = customTasks.filter(t => t.id !== taskId);
    completedSet.delete(taskId);
    localStorage.setItem('wow_forever_custom_tasks', JSON.stringify(customTasks));
    localStorage.setItem('wow_forever_checklist_completed', JSON.stringify([...completedSet]));
    renderChecklist();
  };

  const addTaskForm = document.getElementById('add-task-form');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('new-task-text');
      const text = input ? input.value.trim() : '';
      if (!text) return;

      const newTask = {
        id: 'custom-task-' + Date.now(),
        text,
        cat: 'Personal'
      };

      customTasks.push(newTask);
      localStorage.setItem('wow_forever_custom_tasks', JSON.stringify(customTasks));
      if (input) input.value = '';
      renderChecklist();
    });
  }

  const resetBtn = document.getElementById('reset-checklist-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all milestone completion marks for the Beta Phase 1 checklist?')) {
        completedSet.clear();
        localStorage.setItem('wow_forever_checklist_completed', JSON.stringify([]));
        renderChecklist();
      }
    });
  }

  renderChecklist();
}

/* ==========================================================================
   3. SQUAD / GUILD ROSTER TRACKER
   ========================================================================== */
function initSquadRoster() {
  const rosterTableBody = document.getElementById('squad-roster-body');
  if (!rosterTableBody) return;

  // Load roster from localStorage or prefill with Marcus, Young Hermit Crab, Andrewm
  let squad = JSON.parse(localStorage.getItem('wow_forever_squad_roster') || 'null') || WOW_FOREVER_DATA.squadRosterPresets;

  function renderRoster() {
    // Composition summary
    const tanks = squad.filter(p => p.role.toLowerCase().includes('tank')).length;
    const healers = squad.filter(p => p.role.toLowerCase().includes('heal')).length;
    const dps = squad.filter(p => p.role.toLowerCase().includes('dps')).length;

    const summaryElem = document.getElementById('squad-comp-summary');
    if (summaryElem) {
      summaryElem.innerHTML = `
        <span class="comp-badge tank">🛡️ ${tanks} Tank</span>
        <span class="comp-badge healer">💚 ${healers} Healer${healers === 0 ? ' (Needed!)' : ''}</span>
        <span class="comp-badge dps">⚔️ ${dps} DPS</span>
        <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: auto;">Total Squad: ${squad.length} Players</span>
      `;
    }

    rosterTableBody.innerHTML = squad.map(player => `
      <tr>
        <td><strong>${escapeHtml(player.name)}</strong></td>
        <td><span class="source-badge ${player.faction.toLowerCase() === 'alliance' ? 'source-blizzard' : 'source-wowhead'}">${player.faction}</span></td>
        <td>${escapeHtml(player.race)}</td>
        <td><span style="color: var(--text-gold); font-weight: 600;">${escapeHtml(player.className)}</span></td>
        <td><span class="role-pill role-${player.role.toLowerCase().replace(/[^a-z]/g, '')}">${player.role} (${escapeHtml(player.spec)})</span></td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${escapeHtml(player.notes || '—')}</td>
        <td>
          <button onclick="removeSquadMember('${player.id}')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1rem;">✕</button>
        </td>
      </tr>
    `).join('');
  }

  window.removeSquadMember = function(id) {
    squad = squad.filter(p => p.id !== id);
    localStorage.setItem('wow_forever_squad_roster', JSON.stringify(squad));
    renderRoster();
  };

  const addMemberForm = document.getElementById('add-squad-member-form');
  if (addMemberForm) {
    addMemberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('member-name-input').value.trim();
      const faction = document.getElementById('member-faction-select').value;
      const race = document.getElementById('member-race-select').value;
      const className = document.getElementById('member-class-select').value;
      const role = document.getElementById('member-role-select').value;
      const spec = document.getElementById('member-spec-input').value.trim() || 'General';
      const notes = document.getElementById('member-notes-input').value.trim();

      if (!name) return;

      const newMember = {
        id: 'squad-' + Date.now(),
        name,
        faction,
        race,
        className,
        role,
        spec,
        notes
      };

      squad.push(newMember);
      localStorage.setItem('wow_forever_squad_roster', JSON.stringify(squad));
      addMemberForm.reset();
      renderRoster();
    });
  }

  renderRoster();
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
