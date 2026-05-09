// --- AUTOMATISCHE KEYS MIT VERSION ---
const HS_KEY = 'vj_highscore' + GAME_VERSION;
const SKIN_KEY = 'vj_selected_skin' + GAME_VERSION;
const UNLOCK_KEY = 'vj_unlocked' + GAME_VERSION;
const COMPLETED_LEVELS_KEY = 'vj_completed_levels' + GAME_VERSION;
const SELECTED_TITLE_KEY = 'vj_selected_title' + GAME_VERSION;
const USED_CODES_KEY = 'vj_used_codes' + GAME_VERSION;
const COINS_KEY = 'vj_coins' + GAME_VERSION;
const LAVA_COINS_KEY = 'vj_lava_coins' + GAME_VERSION;
const UNLOCKED_LEVELS_KEY = 'vj_unlocked_levels' + GAME_VERSION;
const LAVARUN_UNLOCK_KEY = 'vj_lavarun_unlocked' + GAME_VERSION;
const TITLE_PREFIX = 'vj_title' + GAME_VERSION + '_';
const DEV_KEY = 'vj_dev' + GAME_VERSION;
const SESSIONS_KEY = 'vj_sessions' + GAME_VERSION;
const TOTAL_JUMPS_KEY = 'vj_total_jumps' + GAME_VERSION;
const TOTAL_FALLS_KEY = 'vj_total_falls' + GAME_VERSION;
const TOTAL_RED_LANDINGS_KEY = 'vj_total_red_landings' + GAME_VERSION;
const TOTAL_BLUE_LANDINGS_KEY = 'vj_total_blue_landings' + GAME_VERSION;
const TOTAL_ORANGE_LANDINGS_KEY = 'vj_total_orange_landings' + GAME_VERSION;

// --- EASTER EGG KEYS ---
const EE_KEY_BLUE  = 'vj_ee_key_blue'  + GAME_VERSION;
const EE_KEY_GREEN = 'vj_ee_key_green' + GAME_VERSION;
const EE_KEY_RED   = 'vj_ee_key_red'   + GAME_VERSION;
const EE_TITLE_KEY = 'vj_ee_title_ei'  + GAME_VERSION;

let eeKeyBlue  = localStorage.getItem(EE_KEY_BLUE)  === 'true';
let eeKeyGreen = localStorage.getItem(EE_KEY_GREEN) === 'true';
let eeKeyRed   = localStorage.getItem(EE_KEY_RED)   === 'true';