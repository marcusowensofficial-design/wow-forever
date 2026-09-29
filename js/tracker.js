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
  const classInfo = getWowClassInfo(char.className);

  sheet.innerHTML = `
    <div class="char-header">
      <div class="char-title"><strong>${escapeHtml(char.name)}</strong></div>
      <span class="char-faction-pill ${factionClass}">${escapeHtml(char.faction)}</span>
    </div>
    <div class="char-meta-grid">
      <div class="char-meta-item"><strong>Race:</strong> ${escapeHtml(char.race)}</div>
      <div class="char-meta-item"><strong>Class:</strong> <span style="color: ${classInfo.color}; font-weight: 700; text-shadow: 0 0 8px ${classInfo.color}40;">${classInfo.icon} ${escapeHtml(char.className)}</span></div>
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
   3. SQUAD / GUILD ROSTER TRACKER & CLASS / PROFESSION REGISTRY
   ========================================================================== */
const WOW_CLASS_METADATA = {
  paladin: { color: '#F58CBA', icon: '🛡️', name: 'Paladin', label: 'Paladin (Pink)' },
  warlock: { color: '#9482C9', icon: '🔮', name: 'Warlock', label: 'Warlock (Purple)' },
  rogue: { color: '#FFF569', icon: '🗡️', name: 'Rogue', label: 'Rogue (Yellow)' },
  warrior: { color: '#C79C6E', icon: '⚔️', name: 'Warrior', label: 'Warrior (Brown)' },
  hunter: { color: '#ABD473', icon: '🏹', name: 'Hunter', label: 'Hunter (Pea Green)' },
  mage: { color: '#69CCF0', icon: '🔥', name: 'Mage', label: 'Mage (Cyan)' },
  priest: { color: '#FFFFFF', icon: '✨', name: 'Priest', label: 'Priest (White)' },
  shaman: { color: '#0070DE', icon: '⚡', name: 'Shaman', label: 'Shaman (Blue)' },
  druid: { color: '#FF7D0A', icon: '🌿', name: 'Druid', label: 'Druid (Orange)' },
  deathknight: { color: '#C41E3A', icon: '💀', name: 'Death Knight', label: 'Death Knight (Red)' },
  monk: { color: '#00FF96', icon: '🥋', name: 'Monk', label: 'Monk (Green)' },
  demonhunter: { color: '#A330C9', icon: '👁️', name: 'Demon Hunter', label: 'Demon Hunter (Purple)' },
  evoker: { color: '#33937F', icon: '🐲', name: 'Evoker', label: 'Evoker (Emerald)' }
};

const WOW_PROFESSION_METADATA = {
  tailoring: { name: 'Tailoring', icon: '✂️' },
  blacksmithing: { name: 'Blacksmithing', icon: '🔨' },
  engineering: { name: 'Engineering', icon: '⚙️' },
  leatherworking: { name: 'Leatherworking', icon: '🥋' },
  alchemy: { name: 'Alchemy', icon: '🧪' },
  enchanting: { name: 'Enchanting', icon: '✨' },
  mining: { name: 'Mining', icon: '⛏️' },
  herbalism: { name: 'Herbalism', icon: '🌿' },
  skinning: { name: 'Skinning', icon: '🪓' }
};

function getWowClassInfo(className) {
  if (!className) return { color: '#fbbf24', icon: '⚔️', name: 'Unknown' };
  const key = className.toLowerCase().replace(/[^a-z]/g, '');
  return WOW_CLASS_METADATA[key] || { color: '#fbbf24', icon: '⚔️', name: className };
}

function getProfBadgeHtml(profName) {
  if (!profName || profName.trim() === '' || profName.toLowerCase() === 'none' || profName.toLowerCase() === 'tbd') {
    return '';
  }
  const key = profName.toLowerCase().replace(/[^a-z]/g, '');
  const info = WOW_PROFESSION_METADATA[key] || { name: profName, icon: '🔨' };
  return `<span class="prof-badge">${info.icon} ${escapeHtml(info.name)}</span>`;
}

function initSquadRoster() {
  const rosterTableBody = document.getElementById('squad-roster-body');
  if (!rosterTableBody) return;

  const SQUAD_STORAGE_KEY = 'wow_forever_squad_roster_v4';

  // Load roster from localStorage or prefill with the default roster presets
  let squad = JSON.parse(localStorage.getItem(SQUAD_STORAGE_KEY) || 'null');
  if (!squad || !Array.isArray(squad) || squad.length === 0) {
    const prevSquad = JSON.parse(localStorage.getItem('wow_forever_squad_roster_v3') || 'null');
    squad = JSON.parse(JSON.stringify(WOW_FOREVER_DATA.squadRosterPresets || []));
    if (Array.isArray(prevSquad)) {
      const customMembers = prevSquad.filter(p => p.id && p.id.startsWith('squad-'));
      if (customMembers.length > 0) {
        squad.push(...customMembers);
      }
    }
    localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
  }

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

    rosterTableBody.innerHTML = squad.map(player => {
      const classInfo = getWowClassInfo(player.className);
      const classKey = (player.className || '').toLowerCase().replace(/[^a-z]/g, '');
      const specText = player.spec ? ` (${escapeHtml(player.spec)})` : '';
      
      const prof1Html = getProfBadgeHtml(player.prof1);
      const prof2Html = getProfBadgeHtml(player.prof2);
      const hasProfs = prof1Html || prof2Html;

      const professionsHtml = hasProfs 
        ? `<div class="prof-badges-wrap" onclick="openProfessionModal('${player.id}')" title="Click to update professions">
            ${prof1Html}
            ${prof2Html}
            <span class="prof-edit-icon" title="Edit professions">✏️</span>
           </div>`
        : `<div class="prof-badges-wrap" onclick="openProfessionModal('${player.id}')" title="Click to set professions">
            <span class="prof-badge prof-tbd">➕ Set Professions</span>
           </div>`;

      return `
      <tr>
        <td><strong>${escapeHtml(player.name)}</strong></td>
        <td><span class="source-badge ${player.faction.toLowerCase() === 'alliance' ? 'source-blizzard' : 'source-wowhead'}">${player.faction}</span></td>
        <td>${escapeHtml(player.race)}</td>
        <td>
          <span class="roster-class-pill class-${classKey}" style="--class-accent: ${classInfo.color}; --class-border: ${classInfo.color}40; background: ${classInfo.color}14;">
            <span class="roster-class-icon">${classInfo.icon}</span>
            <span class="roster-class-name" style="color: ${classInfo.color}; text-shadow: 0 0 10px ${classInfo.color}66;">
              ${escapeHtml(player.className)}
            </span>
          </span>
        </td>
        <td><span class="role-pill role-${player.role.toLowerCase().replace(/[^a-z]/g, '')}">${player.role}${specText}</span></td>
        <td>${professionsHtml}</td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${escapeHtml(player.notes || '—')}</td>
        <td style="white-space: nowrap;">
          <button onclick="openProfessionModal('${player.id}')" title="Update Professions & Notes" class="btn-icon-action" style="color: var(--text-gold); font-size: 1rem; margin-right: 0.25rem;">✏️</button>
          <button onclick="removeSquadMember('${player.id}')" title="Remove Member" class="btn-icon-action" style="color: #ef4444; font-size: 1.1rem;">✕</button>
        </td>
      </tr>
    `}).join('');
  }

  window.removeSquadMember = function(id) {
    squad = squad.filter(p => p.id !== id);
    localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
    renderRoster();
  };

  // Professions Modal controls
  const profModal = document.getElementById('professions-modal-backdrop');
  const profModalClose = document.getElementById('professions-modal-close');
  const profModalCancel = document.getElementById('professions-modal-cancel');
  const editProfForm = document.getElementById('edit-professions-form');
  const editMemberId = document.getElementById('edit-member-id');
  const editProf1Select = document.getElementById('edit-prof1-select');
  const editProf2Select = document.getElementById('edit-prof2-select');
  const editMemberNotes = document.getElementById('edit-member-notes');
  const profModalTitle = document.getElementById('prof-modal-title');
  const profModalSubtitle = document.getElementById('prof-modal-subtitle');

  window.openProfessionModal = function(id) {
    const player = squad.find(p => p.id === id);
    if (!player || !profModal) return;

    if (editMemberId) editMemberId.value = player.id;
    if (profModalTitle) {
      profModalTitle.innerHTML = `<span>🔨</span> Update Professions: ${escapeHtml(player.name)}`;
    }
    if (profModalSubtitle) {
      profModalSubtitle.textContent = `Assign primary professions and update notes for ${player.name} (${player.className}).`;
    }
    if (editProf1Select) editProf1Select.value = player.prof1 || '';
    if (editProf2Select) editProf2Select.value = player.prof2 || '';
    if (editMemberNotes) editMemberNotes.value = player.notes || '';

    profModal.classList.add('open');
  };

  function closeProfModal() {
    if (profModal) profModal.classList.remove('open');
  }

  if (profModalClose) profModalClose.addEventListener('click', closeProfModal);
  if (profModalCancel) profModalCancel.addEventListener('click', closeProfModal);
  if (profModal) {
    profModal.addEventListener('click', (e) => {
      if (e.target === profModal) closeProfModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profModal && profModal.classList.contains('open')) {
      closeProfModal();
    }
  });

  if (editProfForm) {
    editProfForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = editMemberId.value;
      const player = squad.find(p => p.id === id);
      if (player) {
        player.prof1 = editProf1Select.value;
        player.prof2 = editProf2Select.value;
        player.notes = editMemberNotes.value.trim();
        localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
        renderRoster();
      }
      closeProfModal();
    });
  }

  const resetBtn = document.getElementById('reset-squad-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset Squad Roster back to the default roster presets (Thadd, Marcus, BigRed, AndrewM, Brody, Con, Burk)?')) {
        squad = JSON.parse(JSON.stringify(WOW_FOREVER_DATA.squadRosterPresets || []));
        localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
        renderRoster();
      }
    });
  }

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
      const prof1 = document.getElementById('member-prof1-select') ? document.getElementById('member-prof1-select').value : '';
      const prof2 = document.getElementById('member-prof2-select') ? document.getElementById('member-prof2-select').value : '';
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
        prof1,
        prof2,
        notes
      };

      squad.push(newMember);
      localStorage.setItem(SQUAD_STORAGE_KEY, JSON.stringify(squad));
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
