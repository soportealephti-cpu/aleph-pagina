import { useEffect, useRef, useState } from 'react';
import { AULA_API_BASE, AULA_BASE_PATH, AULA_SERVER_BASE } from '../../config/runtime';

type AulaSummary = {
  courseCount: number;
  categoryCount: number;
  activeUserCount: number;
  enrolmentCount: number;
  moduleTypes: string[];
};

type AulaCategory = {
  id: number;
  name: string;
  parent: number;
};

type AulaCourse = {
  id: number;
  fullname: string;
  shortname: string;
  summary: string;
  format: string;
  visible: boolean;
  enrolments: number;
  category?: AulaCategory | null;
};

type AulaUser = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  fullname: string;
  suspended?: boolean;
  auth?: string;
  confirmed?: boolean;
  idnumber?: string;
  phone1?: string;
  phone2?: string;
  institution?: string;
  department?: string;
  address?: string;
  city?: string;
  country?: string;
  lang?: string;
  calendartype?: string;
  theme?: string;
  timezone?: string;
  firstaccess?: number;
  lastaccess?: number;
  lastlogin?: number;
  currentlogin?: number;
  lastip?: string;
  picture?: number;
  url?: string;
  description?: string;
  customFields?: Array<{
    fieldid: number;
    shortname: string;
    name: string;
    datatype: string;
    data: string;
  }>;
  preferences?: Array<{
    id: number;
    name: string;
    value: string;
  }>;
  courseLastAccess?: Array<{
    id: number;
    courseid: number;
    timeaccess: number;
  }>;
  courses?: AulaCourse[];
  canCreateCourse?: boolean;
};

type AulaStatusResponse = {
  ok: boolean;
  summary: AulaSummary;
};

type AulaCoursesResponse = {
  ok: boolean;
  categories: AulaCategory[];
  courses: AulaCourse[];
};

type AulaLoginResponse = {
  ok: boolean;
  token: string;
  user: AulaUser;
  canCreateCourse?: boolean;
  error?: string;
};

type AulaMeResponse = {
  ok: boolean;
  user: AulaUser;
  canCreateCourse?: boolean;
};

type AulaUsersResponse = {
  ok: boolean;
  users: AulaUser[];
};

type AulaParticipantsResponse = {
  ok: boolean;
  participants: AulaUser[];
};

type AulaGradeItem = {
  id: number;
  name: string;
  itemtype: string;
  itemmodule: string;
  grademax: number;
};

type AulaGradeRow = {
  user: Pick<AulaUser, 'id' | 'username' | 'fullname' | 'email'>;
  grades: Array<{
    itemid: number;
    finalgrade: number | null;
    rawgrade: number | null;
    feedback: string;
  }>;
};

type AulaGradesResponse = {
  ok: boolean;
  items: AulaGradeItem[];
  rows: AulaGradeRow[];
};

type AulaEvent = {
  id: number;
  name: string;
  description: string;
  timestart: number;
};

type AulaEventsResponse = {
  ok: boolean;
  events: AulaEvent[];
};

type AulaActivityItem = {
  id: number;
  component: string;
  action: string;
  target: string;
  eventname: string;
  timecreated: number;
  user: { id: number; fullname: string; username: string } | null;
};

type AulaActivityResponse = {
  ok: boolean;
  activity: AulaActivityItem[];
};

type AulaNewsItem = {
  id: number;
  name: string;
  timemodified: number;
};

type AulaNewsResponse = {
  ok: boolean;
  news: AulaNewsItem[];
};

type AulaForumSearchResult = {
  id: number;
  subject: string;
  message: string;
  modified: number;
};

type AulaForumSearchResponse = {
  ok: boolean;
  results: AulaForumSearchResult[];
};

type AulaForumThreadPost = {
  id: number;
  subject: string;
  message: string;
  created: number;
  modified: number;
  user: { id: number; fullname: string; username: string } | null;
};

type AulaForumThread = {
  id: number;
  name: string;
  intro: string;
  discussionCount: number;
  discussions: Array<{
    id: number;
    name: string;
    firstpost: number;
    timemodified: number;
    user: { id: number; fullname: string; username: string } | null;
    posts: AulaForumThreadPost[];
  }>;
};

type AulaForumThreadsResponse = {
  ok: boolean;
  forums: AulaForumThread[];
};

type AulaQuestionBankItem = {
  id: number;
  name: string;
  qtype: string;
  questiontext: string;
  defaultmark: number;
  category: { id: number; name: string } | null;
  answers: Array<{
    id: number;
    answer: string;
    fraction: number;
    feedback: string;
  }>;
  usages: Array<{
    quizId: number;
    quizName: string;
    slot: number;
    page: number;
    maxmark: number;
  }>;
};

type AulaQuestionBankResponse = {
  ok: boolean;
  questions: AulaQuestionBankItem[];
};

type AulaQuizAttempt = {
  id: number;
  quizId: number;
  quizName: string;
  attempt: number;
  state: string;
  preview: boolean;
  sumgrades: number | null;
  timestart: number;
  timefinish: number;
  timemodified: number;
  questionCount: number;
  user: { id: number; fullname: string; username: string } | null;
};

type AulaQuizAttemptsResponse = {
  ok: boolean;
  attempts: AulaQuizAttempt[];
};

type AulaAttachment = {
  id: number;
  filename: string;
  filesize: number;
  mimetype: string;
  filepath: string;
  component: string;
  filearea: string;
  url: string;
};

type AulaModule = {
  id: number;
  type: string;
  name: string;
  intro: string;
  visible: boolean;
  externalUrl: string | null;
  attachments: AulaAttachment[];
};

type AulaSection = {
  id: number;
  number: number;
  name: string;
  summary: string;
  visible: boolean;
  modules: AulaModule[];
};

type AulaCourseDetail = AulaCourse & {
  sections: AulaSection[];
};

type EditorModuleDraft = {
  id: string;
  sectionId: string;
  kind: string;
  name: string;
  intro: string;
  externalUrl: string;
  attachments: AulaAttachment[];
  materialFile: File | null;
  imageFile: File | null;
};

type AulaCourseDetailResponse = {
  ok: boolean;
  course: AulaCourseDetail;
};

type AulaCreateCourseResponse = {
  ok: boolean;
  course?: AulaCourseDetail;
  error?: string;
};

type AulaCreateUserResponse = {
  ok: boolean;
  user?: AulaUser;
  error?: string;
};

type AulaCreateEnrolmentResponse = {
  ok: boolean;
  user?: AulaUser;
  course?: AulaCourseDetail;
  error?: string;
};

type AulaReportView = 'Calificador' | 'Vista general' | 'Informe de usuario' | 'Historial';

const AULA_TOKEN_KEY = 'aleph_aula_token';
const AULA_PANEL_SLUGS: Record<string, string> = {
  'Panel principal': 'panel-principal',
  Catalogo: 'cursos',
  Cursos: 'cursos',
  'Mis cursos': 'mis-cursos',
  Perfil: 'perfil',
  Usuarios: 'usuarios',
  'Asignar usuarios': 'usuarios',
  'Gestionar cursos': 'cursos',
  Matriculas: 'matriculas',
  Categorias: 'categorias',
  Reportes: 'reportes',
  'Reporte de actividad': 'reportes',
  'Curso abierto': 'curso',
  Participantes: 'participantes',
  Calificaciones: 'calificaciones',
  Foros: 'foros',
  Cuestionarios: 'cuestionarios',
  Chats: 'chats',
  Recursos: 'recursos',
  URLs: 'urls',
  Tareas: 'tareas',
  'Administracion del curso': 'administracion',
  'Editar contenido del curso': 'editar-contenido-del-curso',
  'Configuracion del curso': 'configuracion',
  'Banco de preguntas': 'banco-de-preguntas',
  'Usuarios matriculados': 'usuarios-matriculados',
  Grupos: 'grupos',
  Permisos: 'permisos',
  'Comprobar permisos': 'comprobar-permisos',
  Filtros: 'filtros',
  'Copia de respaldo': 'copia-de-respaldo',
  Restaurar: 'restaurar',
  Importar: 'importar',
  Reiniciar: 'reiniciar',
  'Archivos del curso': 'archivos-del-curso',
};
const AULA_SLUG_TO_PANEL = Object.fromEntries(
  Object.entries(AULA_PANEL_SLUGS).map(([panel, slug]) => [slug, panel]),
) as Record<string, string>;
const AULA_ADMIN_ONLY_PANELS = new Set([
  'Cursos',
  'Usuarios',
  'Asignar usuarios',
  'Gestionar cursos',
  'Matriculas',
  'Categorias',
  'Reportes',
  'Reporte de actividad',
  'Administracion del curso',
  'Editar contenido del curso',
  'Configuracion del curso',
  'Banco de preguntas',
  'Usuarios matriculados',
  'Grupos',
  'Permisos',
  'Comprobar permisos',
  'Filtros',
  'Copia de respaldo',
  'Restaurar',
  'Importar',
  'Reiniciar',
  'Archivos del curso',
]);
const AULA_COURSE_CONTEXT_PANELS = new Set([
  'Curso abierto',
  'Participantes',
  'Calificaciones',
  'Foros',
  'Cuestionarios',
  'Chats',
  'Recursos',
  'URLs',
  'Tareas',
  'Administracion del curso',
  'Editar contenido del curso',
  'Configuracion del curso',
  'Banco de preguntas',
  'Usuarios matriculados',
  'Grupos',
  'Permisos',
  'Comprobar permisos',
  'Filtros',
  'Copia de respaldo',
  'Restaurar',
  'Importar',
  'Reiniciar',
  'Archivos del curso',
]);

function getAulaBasePath() {
  if (AULA_BASE_PATH) return AULA_BASE_PATH;
  return '/aula-virtual/';
}

function buildAulaPath(basePath: string, panel: string, courseId?: number | null) {
  const panelSlug = AULA_PANEL_SLUGS[panel] ?? 'panel-principal';

  if (courseId) {
    return panel === 'Curso abierto'
      ? `${basePath}curso/${courseId}/`
      : `${basePath}curso/${courseId}/${panelSlug}/`;
  }

  return panel === 'Panel principal' ? basePath : `${basePath}${panelSlug}/`;
}

function parseAulaPath() {
  const basePath = getAulaBasePath();
  const pathname = window.location.pathname.toLowerCase();
  const relative = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length).replace(/\/+$/, '')
    : '';

  if (!relative) {
    return {
      basePath,
      panel: 'Panel principal',
      courseId: null as number | null,
    };
  }

  const parts = relative.split('/').filter(Boolean);
  if (parts[0] === 'curso' && parts[1]) {
    const courseId = Number(parts[1]);
    const panelSlug = parts[2] ?? 'curso';
    const panel = panelSlug === 'curso' ? 'Curso abierto' : AULA_SLUG_TO_PANEL[panelSlug] ?? 'Curso abierto';
    return {
      basePath,
      panel,
      courseId: Number.isFinite(courseId) ? courseId : null,
    };
  }

  const panel = AULA_SLUG_TO_PANEL[parts[0]] ?? 'Panel principal';
  return {
    basePath,
    panel,
    courseId: null as number | null,
  };
}

function sanitizeAulaPanel(panel: string, canCreateCourse: boolean, hasCourseContext: boolean) {
  if (!canCreateCourse && (AULA_ADMIN_ONLY_PANELS.has(panel) || panel === 'Participantes')) {
    return hasCourseContext ? 'Curso abierto' : 'Panel principal';
  }

  if (!hasCourseContext && AULA_COURSE_CONTEXT_PANELS.has(panel)) {
    return 'Panel principal';
  }

  return panel;
}

function LegacyBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 border border-slate-300 bg-white shadow-sm">
      <header className="border-b border-slate-300 bg-[#eef3f7] px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-[0.05em] text-[#25364f]">{title}</h3>
      </header>
      <div className="min-w-0 overflow-hidden px-4 py-4">{children}</div>
    </section>
  );
}

function LegacyLinkList({
  items,
  activeItem,
  onSelect,
}: {
  items: string[];
  activeItem?: string;
  onSelect?: (item: string) => void;
}) {
  return (
    <ul className="space-y-2 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item} className="border-b border-dashed border-slate-200 pb-2 last:border-b-0 last:pb-0">
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full cursor-pointer text-left transition hover:text-[#0f5ea8] ${activeItem === item ? 'font-bold text-[#0f5ea8]' : ''}`}
            >
              {item}
            </button>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}

function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 });
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div>
      <p className="text-sm font-semibold capitalize text-[#25364f]">
        {now.toLocaleString('es-PE', { month: 'long', year: 'numeric' })}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px]">
        {weekDays.map((day, index) => (
          <div key={`${day}-${index}`} className="font-bold text-slate-500">
            {day}
          </div>
        ))}
        {leadingEmpty.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`rounded-sm border px-1 py-2 ${
              day === now.getDate()
                ? 'border-[#0f5ea8] bg-[#0f5ea8] text-white'
                : 'border-slate-200 bg-[#f8fbff] text-slate-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatLastAccess(value?: number) {
  if (!value) return 'Sin acceso registrado';

  try {
    return new Date(value * 1000).toLocaleString('es-PE');
  } catch {
    return 'Sin acceso registrado';
  }
}

function formatRelativeAccess(value?: number) {
  if (!value) return 'Sin acceso registrado';

  const now = Date.now();
  const diffSeconds = Math.max(0, Math.floor((now - value * 1000) / 1000));

  if (diffSeconds < 60) {
    return `${diffSeconds} seg`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 min' : `${diffMinutes} min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return diffHours === 1 ? '1 hora' : `${diffHours} horas`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return diffDays === 1 ? '1 día' : `${diffDays} días`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return diffMonths === 1 ? '1 mes' : `${diffMonths} meses`;
  }

  const diffYears = Math.floor(diffDays / 365);
  return diffYears === 1 ? '1 año' : `${diffYears} años`;
}

function formatUnixDate(value?: number) {
  if (!value) return 'Sin fecha registrada';

  try {
    return new Date(value * 1000).toLocaleString('es-PE');
  } catch {
    return 'Sin fecha registrada';
  }
}

function formatAulaPreferenceName(name: string) {
  const normalized = String(name || '').trim();
  const labels: Record<string, string> = {
    auth_forcepasswordchange: 'Forzar cambio de contraseña',
    email_bounce_count: 'Rebotes de correo',
    email_send_count: 'Conteo de correos enviados',
    forum_autosubscribe: 'Auto suscripción a foros',
    forum_trackreadposts: 'Seguimiento de foros leídos',
    message_airnotifier_enabled: 'Notificaciones push',
    message_email_enabled: 'Notificaciones por correo',
    message_popup_enabled: 'Notificaciones emergentes',
    message_provider_moodle_instantmessage_loggedoff: 'Mensajes instantáneos desconectado',
    message_provider_moodle_instantmessage_loggedin: 'Mensajes instantáneos conectado',
    message_provider_moodle_messagecontactrequests_loggedoff: 'Solicitudes de contacto desconectado',
    message_provider_moodle_messagecontactrequests_loggedin: 'Solicitudes de contacto conectado',
    message_provider_mod_assign_assign_notification_loggedoff: 'Avisos de tareas desconectado',
    message_provider_mod_assign_assign_notification_loggedin: 'Avisos de tareas conectado',
    message_provider_mod_forum_posts_loggedoff: 'Avisos de foros desconectado',
    message_provider_mod_forum_posts_loggedin: 'Avisos de foros conectado',
    navcollapse: 'Bloques de navegación colapsados',
  };

  if (labels[normalized]) return labels[normalized];

  if (normalized.startsWith('tool_usertours_tour_completion_time_')) {
    return 'Recorrido de usuario completado';
  }

  return normalized
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatAulaPreferenceValue(value: string) {
  const normalized = String(value ?? '').trim();

  if (normalized === '1') return 'Sí';
  if (normalized === '0') return 'No';

  if (/^\d{9,}$/.test(normalized)) {
    const numericValue = Number(normalized);
    if (Number.isFinite(numericValue) && numericValue > 946684800) {
      return formatLastAccess(numericValue);
    }
  }

  return normalized || 'Sin dato';
}

function getModuleTypeLabel(type: string) {
  switch (type) {
    case 'forum':
      return 'Foros';
    case 'quiz':
      return 'Cuestionarios';
    case 'chat':
      return 'Chats';
    case 'resource':
    case 'folder':
      return 'Recursos';
    case 'url':
      return 'URLs';
    case 'assign':
      return 'Tareas';
    default:
      return type;
  }
}

export function AulaVirtualPage() {
  const routeSyncRef = useRef<'idle' | 'syncing'>('idle');
  const [summary, setSummary] = useState<AulaSummary | null>(null);
  const [courses, setCourses] = useState<AulaCourse[]>([]);
  const [categories, setCategories] = useState<AulaCategory[]>([]);
  const [user, setUser] = useState<AulaUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [activePanel, setActivePanel] = useState('Panel principal');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<AulaCourseDetail | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [users, setUsers] = useState<AulaUser[]>([]);
  const [participants, setParticipants] = useState<AulaUser[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [gradeItems, setGradeItems] = useState<AulaGradeItem[]>([]);
  const [gradeRows, setGradeRows] = useState<AulaGradeRow[]>([]);
  const [events, setEvents] = useState<AulaEvent[]>([]);
  const [activityItems, setActivityItems] = useState<AulaActivityItem[]>([]);
  const [newsItems, setNewsItems] = useState<AulaNewsItem[]>([]);
  const [forumQuery, setForumQuery] = useState('');
  const [forumResults, setForumResults] = useState<AulaForumSearchResult[]>([]);
  const [forumThreads, setForumThreads] = useState<AulaForumThread[]>([]);
  const [questionBankItems, setQuestionBankItems] = useState<AulaQuestionBankItem[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<AulaQuizAttempt[]>([]);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [courseForm, setCourseForm] = useState({
    id: '',
    fullname: '',
    shortname: '',
    summary: '',
    category: '',
    visible: '1',
    format: 'topics',
    idnumber: '',
    lang: 'es',
    theme: '',
    calendartype: '',
    newsitems: '5',
    showgrades: '1',
    showreports: '0',
    legacyfiles: '0',
    maxbytes: '0',
    enablecompletion: '0',
    groupmode: '0',
    groupmodeforce: '0',
    defaultgroupingid: '0',
  });
  const [courseFormLoading, setCourseFormLoading] = useState(false);
  const [courseFormMessage, setCourseFormMessage] = useState<string | null>(null);
  const [userForm, setUserForm] = useState({
    id: '',
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    password: '',
    auth: 'manual',
    confirmed: '1',
    suspended: '0',
  });
  const [userFormLoading, setUserFormLoading] = useState(false);
  const [userFormMessage, setUserFormMessage] = useState<string | null>(null);
  const [enrolForm, setEnrolForm] = useState({
    userId: '',
    courseId: '',
  });
  const [enrolFormLoading, setEnrolFormLoading] = useState(false);
  const [enrolFormMessage, setEnrolFormMessage] = useState<string | null>(null);
  const [reportView, setReportView] = useState<AulaReportView>('Calificador');
  const [adminActionMessage, setAdminActionMessage] = useState<string | null>(null);
  const [sectionForm, setSectionForm] = useState({
    name: '',
    summary: '',
  });
  const [sectionFormLoading, setSectionFormLoading] = useState(false);
  const [sectionFormMessage, setSectionFormMessage] = useState<string | null>(null);
  const [moduleForm, setModuleForm] = useState({
    id: '',
    sectionId: '',
    kind: 'label',
    name: '',
    intro: '',
    externalUrl: '',
  });
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [moduleFormLoading, setModuleFormLoading] = useState(false);
  const [moduleFormMessage, setModuleFormMessage] = useState<string | null>(null);
  const [editorSectionId, setEditorSectionId] = useState('');
  const [editorModuleDrafts, setEditorModuleDrafts] = useState<EditorModuleDraft[]>([]);
  const [editorDraftMessages, setEditorDraftMessages] = useState<Record<string, string>>({});
  const [editorSavingIds, setEditorSavingIds] = useState<Record<string, boolean>>({});
  const [editorSaveAllLoading, setEditorSaveAllLoading] = useState(false);
  const [editorSaveAllMessage, setEditorSaveAllMessage] = useState<string | null>(null);

  function clearOpenedCourse() {
    setSelectedCourseDetail(null);
    setSelectedSectionId(null);
    setParticipants([]);
    setGradeItems([]);
    setGradeRows([]);
    setEvents([]);
    setActivityItems([]);
    setNewsItems([]);
    setForumResults([]);
    setForumThreads([]);
    setQuestionBankItems([]);
    setQuizAttempts([]);
  }

  useEffect(() => {
    let active = true;

    async function loadAula() {
      try {
        setLoading(true);
        setError(null);

        const [statusResponse, coursesResponse] = await Promise.all([
          fetch(`${AULA_API_BASE}/status`),
          fetch(`${AULA_API_BASE}/courses`),
        ]);

        if (!statusResponse.ok || !coursesResponse.ok) {
          throw new Error('No se pudo cargar el Aula Virtual recuperada.');
        }

        const statusPayload = (await statusResponse.json()) as AulaStatusResponse;
        const coursesPayload = (await coursesResponse.json()) as AulaCoursesResponse;

        if (!active) return;

        setSummary(statusPayload.summary);
        setCourses(coursesPayload.courses ?? []);
        setCategories(coursesPayload.categories ?? []);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : 'Error al cargar el Aula Virtual.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAula();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token) return;

    async function loadProfile() {
      try {
        const response = await fetch(`${AULA_API_BASE}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          window.localStorage.removeItem(AULA_TOKEN_KEY);
          return;
        }

        const payload = (await response.json()) as AulaMeResponse;
        if (!active) return;
        setUser({
          ...payload.user,
          canCreateCourse: payload.canCreateCourse ?? payload.user.canCreateCourse ?? false,
        });
      } catch {
        window.localStorage.removeItem(AULA_TOKEN_KEY);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch(`${AULA_API_BASE}/users`);
        if (!response.ok) return;
        const payload = (await response.json()) as AulaUsersResponse;
        if (!active) return;
        setUsers(payload.users ?? []);
      } catch {
        if (!active) return;
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, [user]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setAuthLoading(true);
      setAuthError(null);

      const response = await fetch(`${AULA_API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const payload = (await response.json()) as AulaLoginResponse;

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'No se pudo iniciar sesion.');
      }

      window.localStorage.setItem(AULA_TOKEN_KEY, payload.token);
      setUser({
        ...payload.user,
        canCreateCourse: payload.canCreateCourse ?? payload.user.canCreateCourse ?? false,
      });
      setPassword('');
    } catch (loginError) {
      setAuthError(loginError instanceof Error ? loginError.message : 'No se pudo iniciar sesion.');
    } finally {
      setAuthLoading(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(AULA_TOKEN_KEY);
    setUser(null);
    setIdentifier('');
    setPassword('');
    setAuthError(null);
    setActivePanel('Panel principal');
    clearOpenedCourse();
    setCourseFormMessage(null);
    setUserFormMessage(null);
    setEnrolFormMessage(null);
  }

  async function refreshCatalog() {
    const [statusResponse, coursesResponse] = await Promise.all([
      fetch(`${AULA_API_BASE}/status`),
      fetch(`${AULA_API_BASE}/courses`),
    ]);

    if (!statusResponse.ok || !coursesResponse.ok) {
      throw new Error('No se pudo actualizar el catalogo del aula.');
    }

    const statusPayload = (await statusResponse.json()) as AulaStatusResponse;
    const coursesPayload = (await coursesResponse.json()) as AulaCoursesResponse;
    setSummary(statusPayload.summary);
    setCourses(coursesPayload.courses ?? []);
    setCategories(coursesPayload.categories ?? []);
  }

  async function openCourse(courseId: number, panelAfterOpen = 'Curso abierto') {
    try {
      setDetailLoading(true);
      setParticipantsLoading(true);
      setSidebarLoading(true);
      const token = window.localStorage.getItem(AULA_TOKEN_KEY);
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;
      const emptyParticipantsResponse = Promise.resolve(
        new Response(JSON.stringify({ ok: true, participants: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      const emptyActivityResponse = Promise.resolve(
        new Response(JSON.stringify({ ok: true, activity: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      const [
        response,
        participantsResponse,
        gradesResponse,
        eventsResponse,
        activityResponse,
        newsResponse,
        forumThreadsResponse,
        questionBankResponse,
        quizAttemptsResponse,
      ] = await Promise.all([
        fetch(`${AULA_API_BASE}/courses/${courseId}`, { headers: authHeaders }),
        user?.canCreateCourse
          ? fetch(`${AULA_API_BASE}/courses/${courseId}/participants`, { headers: authHeaders })
          : emptyParticipantsResponse,
        fetch(`${AULA_API_BASE}/courses/${courseId}/grades`, { headers: authHeaders }),
        fetch(`${AULA_API_BASE}/courses/${courseId}/events`, { headers: authHeaders }),
        user?.canCreateCourse
          ? fetch(`${AULA_API_BASE}/courses/${courseId}/activity`, { headers: authHeaders })
          : emptyActivityResponse,
        fetch(`${AULA_API_BASE}/courses/${courseId}/news`, { headers: authHeaders }),
        fetch(`${AULA_API_BASE}/courses/${courseId}/forum-threads`, { headers: authHeaders }),
        fetch(`${AULA_API_BASE}/courses/${courseId}/question-bank`, { headers: authHeaders }),
        fetch(`${AULA_API_BASE}/courses/${courseId}/quiz-attempts`, { headers: authHeaders }),
      ]);
      if (
        !response.ok ||
        !participantsResponse.ok ||
        !gradesResponse.ok ||
        !eventsResponse.ok ||
        !activityResponse.ok ||
        !newsResponse.ok ||
        !forumThreadsResponse.ok ||
        !questionBankResponse.ok ||
        !quizAttemptsResponse.ok
      ) {
        throw new Error('No se pudo cargar el detalle del curso.');
      }

      const payload = (await response.json()) as AulaCourseDetailResponse;
      const participantsPayload = (await participantsResponse.json()) as AulaParticipantsResponse;
      const gradesPayload = (await gradesResponse.json()) as AulaGradesResponse;
      const eventsPayload = (await eventsResponse.json()) as AulaEventsResponse;
      const activityPayload = (await activityResponse.json()) as AulaActivityResponse;
      const newsPayload = (await newsResponse.json()) as AulaNewsResponse;
      const forumThreadsPayload = (await forumThreadsResponse.json()) as AulaForumThreadsResponse;
      const questionBankPayload = (await questionBankResponse.json()) as AulaQuestionBankResponse;
      const quizAttemptsPayload = (await quizAttemptsResponse.json()) as AulaQuizAttemptsResponse;
      setSelectedCourseDetail(payload.course);
      setSelectedSectionId(null);
      setParticipants(participantsPayload.participants ?? []);
      setGradeItems(gradesPayload.items ?? []);
      setGradeRows(gradesPayload.rows ?? []);
      setEvents(eventsPayload.events ?? []);
      setActivityItems(activityPayload.activity ?? []);
      setNewsItems(newsPayload.news ?? []);
      setForumResults([]);
      setForumQuery('');
      setForumThreads(forumThreadsPayload.forums ?? []);
      setQuestionBankItems(questionBankPayload.questions ?? []);
      setQuizAttempts(quizAttemptsPayload.attempts ?? []);
      setActivePanel(panelAfterOpen);
    } catch (courseError) {
      setError(courseError instanceof Error ? courseError.message : 'No se pudo cargar el detalle del curso.');
    } finally {
      setDetailLoading(false);
      setParticipantsLoading(false);
      setSidebarLoading(false);
    }
  }

  useEffect(() => {
    const applyRouteState = async () => {
      const routeState = parseAulaPath();
      routeSyncRef.current = 'syncing';
      const sanitizedPanel = sanitizeAulaPanel(
        routeState.panel,
        Boolean(user?.canCreateCourse),
        Boolean(routeState.courseId),
      );

      if (routeState.courseId) {
        if (selectedCourseDetail?.id !== routeState.courseId) {
          await openCourse(routeState.courseId);
        }
        setActivePanel(sanitizedPanel);
      } else {
        clearOpenedCourse();
        setActivePanel(sanitizedPanel);
      }

      window.setTimeout(() => {
        routeSyncRef.current = 'idle';
      }, 0);
    };

    const handlePopState = () => {
      void applyRouteState();
    };

    window.addEventListener('popstate', handlePopState);
    void applyRouteState();

    return () => window.removeEventListener('popstate', handlePopState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;

    const sanitizedPanel = sanitizeAulaPanel(
      activePanel,
      Boolean(user.canCreateCourse),
      Boolean(selectedCourseDetail),
    );

    if (sanitizedPanel !== activePanel) {
      setActivePanel(sanitizedPanel);
    }
  }, [activePanel, selectedCourseDetail, user]);

  useEffect(() => {
    if (routeSyncRef.current === 'syncing') {
      return;
    }

    const targetPath = buildAulaPath(getAulaBasePath(), activePanel, selectedCourseDetail?.id ?? null);
    const currentPath = window.location.pathname.endsWith('/')
      ? window.location.pathname
      : `${window.location.pathname}/`;

    if (currentPath !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  }, [activePanel, selectedCourseDetail?.id]);

  async function handleForumSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedCourseDetail || !forumQuery.trim()) {
      setForumResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${AULA_API_BASE}/courses/${selectedCourseDetail.id}/forum-search?q=${encodeURIComponent(forumQuery.trim())}`,
      );
      if (!response.ok) {
        throw new Error('No se pudo buscar en los foros.');
      }

      const payload = (await response.json()) as AulaForumSearchResponse;
      setForumResults(payload.results ?? []);
    } catch {
      setForumResults([]);
    }
  }

  async function handleReloadRecovery() {
    try {
      setAdminActionMessage(null);
      const response = await fetch(`${AULA_API_BASE}/reload`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('No se pudo recargar el aula desde el backup.');
      }
      await refreshCatalog();
      if (selectedCourseDetail?.id) {
        await openCourse(selectedCourseDetail.id);
      }
      setAdminActionMessage('La informacion del aula se recargo desde el backup local.');
    } catch (reloadError) {
      setAdminActionMessage(reloadError instanceof Error ? reloadError.message : 'No se pudo recargar el aula.');
    }
  }

  function handleDownloadCourseBackup() {
    if (!selectedCourseDetail) return;

    const backupPayload = {
      exportedAt: new Date().toISOString(),
      course: selectedCourseDetail,
      participants,
      gradeItems,
      gradeRows,
      events,
      activityItems,
      newsItems,
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCourseDetail.shortname || 'curso'}-backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setAdminActionMessage(`Se descargo un respaldo JSON de ${selectedCourseDetail.fullname}.`);
  }

  useEffect(() => {
    setModuleForm((current) => ({
      ...current,
      sectionId:
        selectedCourseDetail?.sections.some((section) => String(section.id) === current.sectionId)
          ? current.sectionId
          : selectedCourseDetail?.sections[0]
            ? String(selectedCourseDetail.sections[0].id)
        : '',
    }));
    setEditorSectionId((current) =>
      selectedCourseDetail?.sections.some((section) => String(section.id) === current)
        ? current
        : selectedCourseDetail?.sections[0]
          ? String(selectedCourseDetail.sections[0].id)
          : '',
    );
  }, [selectedCourseDetail?.id, selectedCourseDetail?.sections]);

  useEffect(() => {
    const selectedSection = selectedCourseDetail?.sections.find((section) => String(section.id) === editorSectionId);
    setEditorModuleDrafts(
      (selectedSection?.modules ?? []).map((module) => buildEditorDraft(module, String(selectedSection?.id ?? ''))),
    );
    setEditorDraftMessages({});
    setEditorSavingIds({});
    setEditorSaveAllMessage(null);
  }, [selectedCourseDetail?.id, selectedCourseDetail?.sections, editorSectionId]);

  function resetCourseForm() {
    setCourseForm({
      id: '',
      fullname: '',
      shortname: '',
      summary: '',
      category: '',
      visible: '1',
      format: 'topics',
      idnumber: '',
      lang: 'es',
      theme: '',
      calendartype: '',
      newsitems: '5',
      showgrades: '1',
      showreports: '0',
      legacyfiles: '0',
      maxbytes: '0',
      enablecompletion: '0',
      groupmode: '0',
      groupmodeforce: '0',
      defaultgroupingid: '0',
    });
  }

  function beginCourseEdit(course: AulaCourse) {
    setCourseForm({
      id: String(course.id),
      fullname: course.fullname,
      shortname: course.shortname,
      summary: course.summary ?? '',
      category: String(course.category?.id ?? ''),
      visible: course.visible ? '1' : '0',
      format: course.format ?? 'topics',
      idnumber: '',
      lang: 'es',
      theme: '',
      calendartype: '',
      newsitems: '5',
      showgrades: '1',
      showreports: '0',
      legacyfiles: '0',
      maxbytes: '0',
      enablecompletion: '0',
      groupmode: '0',
      groupmodeforce: '0',
      defaultgroupingid: '0',
    });
    setCourseFormMessage(`Editando ${course.fullname}`);
  }

  function resetUserForm() {
    setUserForm({
      id: '',
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      city: '',
      country: '',
      password: '',
      auth: 'manual',
      confirmed: '1',
      suspended: '0',
    });
  }

  function beginUserEdit(item: AulaUser) {
    setUserForm({
      id: String(item.id),
      username: item.username,
      email: item.email ?? '',
      firstname: item.firstname ?? '',
      lastname: item.lastname ?? '',
      city: item.city ?? '',
      country: item.country ?? '',
      password: '',
      auth: 'manual',
      confirmed: '1',
      suspended: '0',
    });
    setUserFormMessage(`Editando ${item.fullname || item.username}`);
  }

  async function handleCreateCourse(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token) {
      setCourseFormMessage('Sesion invalida.');
      return;
    }

    try {
      setCourseFormLoading(true);
      setCourseFormMessage(null);

      const editingCourseId = courseForm.id.trim();
      const response = await fetch(editingCourseId ? `${AULA_API_BASE}/courses/${editingCourseId}` : `${AULA_API_BASE}/courses`, {
        method: editingCourseId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseForm),
      });

      const payload = (await response.json()) as AulaCreateCourseResponse;
      if (!response.ok || !payload.ok || !payload.course) {
        throw new Error(payload.error || 'No se pudo guardar el curso.');
      }

      await refreshCatalog();
      await openCourse(payload.course.id);
      resetCourseForm();
      setCourseFormMessage(editingCourseId ? 'Curso actualizado correctamente.' : 'Curso creado correctamente.');
    } catch (createError) {
      setCourseFormMessage(createError instanceof Error ? createError.message : 'No se pudo guardar el curso.');
    } finally {
      setCourseFormLoading(false);
    }
  }

  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token) {
      setUserFormMessage('Sesion invalida.');
      return;
    }

    try {
      setUserFormLoading(true);
      setUserFormMessage(null);

      const editingUserId = userForm.id.trim();
      const response = await fetch(editingUserId ? `${AULA_API_BASE}/users/${editingUserId}` : `${AULA_API_BASE}/users`, {
        method: editingUserId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userForm),
      });

      const payload = (await response.json()) as AulaCreateUserResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'No se pudo guardar el usuario.');
      }

      const usersResponse = await fetch(`${AULA_API_BASE}/users`);
      const usersPayload = (await usersResponse.json()) as AulaUsersResponse;
      setUsers(usersPayload.users ?? []);
      resetUserForm();
      setUserFormMessage(editingUserId ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.');
    } catch (createError) {
      setUserFormMessage(createError instanceof Error ? createError.message : 'No se pudo guardar el usuario.');
    } finally {
      setUserFormLoading(false);
    }
  }

  async function handleCreateEnrolment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token) {
      setEnrolFormMessage('Sesion invalida.');
      return;
    }

    try {
      setEnrolFormLoading(true);
      setEnrolFormMessage(null);

      const response = await fetch(`${AULA_API_BASE}/enrolments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(enrolForm.userId),
          courseId: Number(enrolForm.courseId),
        }),
      });

      const payload = (await response.json()) as AulaCreateEnrolmentResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'No se pudo matricular al usuario.');
      }

      await refreshCatalog();
      const usersResponse = await fetch(`${AULA_API_BASE}/users`);
      const usersPayload = (await usersResponse.json()) as AulaUsersResponse;
      setUsers(usersPayload.users ?? []);
      if (payload.course?.id) {
        await openCourse(payload.course.id);
      }
      setEnrolForm({ userId: '', courseId: '' });
      setEnrolFormMessage('Matricula registrada correctamente.');
    } catch (createError) {
      setEnrolFormMessage(createError instanceof Error ? createError.message : 'No se pudo registrar la matricula.');
    } finally {
      setEnrolFormLoading(false);
    }
  }

  function resetSectionForm() {
    setSectionForm({
      name: '',
      summary: '',
    });
  }

  function resetModuleForm() {
    setModuleForm({
      id: '',
      sectionId: editorSectionId || (selectedCourseDetail?.sections[0] ? String(selectedCourseDetail.sections[0].id) : ''),
      kind: 'label',
      name: '',
      intro: '',
      externalUrl: '',
    });
    setMaterialFile(null);
    setImageFile(null);
  }

  function selectEditorSection(sectionId: string) {
    setEditorSectionId(sectionId);
    setModuleForm({
      id: '',
      sectionId,
      kind: 'label',
      name: '',
      intro: '',
      externalUrl: '',
    });
    setMaterialFile(null);
    setImageFile(null);
    setModuleFormMessage(null);
  }

  function inferModuleKind(module: AulaModule) {
    return module.type === 'url'
      ? 'url'
      : module.type === 'label'
        ? 'label'
        : module.attachments.some((attachment) => String(attachment.mimetype || '').toLowerCase().startsWith('image/'))
          ? 'image'
          : 'material';
  }

  function buildEditorDraft(module: AulaModule, sectionId: string): EditorModuleDraft {
    return {
      id: String(module.id),
      sectionId,
      kind: inferModuleKind(module),
      name: module.name || '',
      intro: module.intro || '',
      externalUrl: module.externalUrl || '',
      attachments: module.attachments ?? [],
      materialFile: null,
      imageFile: null,
    };
  }

  function updateEditorDraft(moduleId: string, updater: (draft: EditorModuleDraft) => EditorModuleDraft) {
    setEditorModuleDrafts((current) => current.map((draft) => (draft.id === moduleId ? updater(draft) : draft)));
  }

  function beginModuleEdit(section: AulaSection, module: AulaModule) {
    const inferredKind = inferModuleKind(module);

      setModuleForm({
        id: String(module.id),
        sectionId: String(section.id),
        kind: inferredKind,
        name: module.name || '',
        intro: module.intro || '',
        externalUrl: module.externalUrl || '',
      });
      setEditorSectionId(String(section.id));
      setMaterialFile(null);
      setImageFile(null);
      setModuleFormMessage(`Editando "${module.name}" en ${section.name}`);
  }

  async function handleCreateSection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token || !selectedCourseDetail) {
      setSectionFormMessage('Sesion invalida o curso no disponible.');
      return;
    }

    try {
      setSectionFormLoading(true);
      setSectionFormMessage(null);

      const response = await fetch(`${AULA_API_BASE}/courses/${selectedCourseDetail.id}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sectionForm),
      });

      const payload = (await response.json()) as AulaCreateCourseResponse;
      if (!response.ok || !payload.ok || !payload.course) {
        throw new Error(payload.error || 'No se pudo crear el tema.');
      }

      await refreshCatalog();
      await openCourse(payload.course.id);
      resetSectionForm();
      setSectionFormMessage('Tema creado correctamente.');
    } catch (sectionError) {
      setSectionFormMessage(sectionError instanceof Error ? sectionError.message : 'No se pudo crear el tema.');
    } finally {
      setSectionFormLoading(false);
    }
  }

  async function handleCreateModule(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token || !selectedCourseDetail) {
      setModuleFormMessage('Sesion invalida o curso no disponible.');
      return;
    }

    try {
      setModuleFormLoading(true);
      setModuleFormMessage(null);

      const formData = new FormData();
      const backendType = moduleForm.kind === 'material' || moduleForm.kind === 'image' ? 'resource' : moduleForm.kind;
      formData.append('type', backendType);
      formData.append('name', moduleForm.name);
      formData.append('intro', moduleForm.intro);
      formData.append('externalUrl', moduleForm.externalUrl);

      if (moduleForm.kind === 'material' && materialFile) {
        formData.append('materialFile', materialFile);
      }
      if (moduleForm.kind === 'image' && imageFile) {
        formData.append('imageFile', imageFile);
      }

      const editingModuleId = moduleForm.id.trim();
      const response = await fetch(
        editingModuleId
          ? `${AULA_API_BASE}/courses/${selectedCourseDetail.id}/sections/${moduleForm.sectionId}/modules/${editingModuleId}`
          : `${AULA_API_BASE}/courses/${selectedCourseDetail.id}/sections/${moduleForm.sectionId}/modules`,
        {
          method: editingModuleId ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const payload = (await response.json()) as AulaCreateCourseResponse;
      if (!response.ok || !payload.ok || !payload.course) {
        throw new Error(payload.error || 'No se pudo crear el contenido.');
      }

      await refreshCatalog();
      await openCourse(payload.course.id);
      resetModuleForm();
      setModuleFormMessage(editingModuleId ? 'Contenido actualizado correctamente.' : 'Contenido agregado correctamente.');
    } catch (moduleError) {
      setModuleFormMessage(moduleError instanceof Error ? moduleError.message : 'No se pudo crear el contenido.');
    } finally {
      setModuleFormLoading(false);
    }
  }

  async function saveEditorDraft(draft: EditorModuleDraft, silent = false) {
    const token = window.localStorage.getItem(AULA_TOKEN_KEY);
    if (!token || !selectedCourseDetail) {
      if (!silent) {
        setEditorDraftMessages((current) => ({ ...current, [draft.id]: 'Sesion invalida o curso no disponible.' }));
      }
      return false;
    }

    try {
      setEditorSavingIds((current) => ({ ...current, [draft.id]: true }));
      if (!silent) {
        setEditorDraftMessages((current) => ({ ...current, [draft.id]: '' }));
      }

      const formData = new FormData();
      const backendType = draft.kind === 'material' || draft.kind === 'image' ? 'resource' : draft.kind;
      formData.append('type', backendType);
      formData.append('name', draft.name);
      formData.append('intro', draft.intro);
      formData.append('externalUrl', draft.externalUrl);

      if (draft.kind === 'material' && draft.materialFile) {
        formData.append('materialFile', draft.materialFile);
      }
      if (draft.kind === 'image' && draft.imageFile) {
        formData.append('imageFile', draft.imageFile);
      }

      const response = await fetch(
        `${AULA_API_BASE}/courses/${selectedCourseDetail.id}/sections/${draft.sectionId}/modules/${draft.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const payload = (await response.json()) as AulaCreateCourseResponse;
      if (!response.ok || !payload.ok || !payload.course) {
        throw new Error(payload.error || 'No se pudo guardar el contenido.');
      }

      await refreshCatalog();
      await openCourse(payload.course.id, 'Editar contenido del curso');
      if (!silent) {
        setEditorDraftMessages((current) => ({ ...current, [draft.id]: 'Contenido guardado correctamente.' }));
      }
      return true;
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'No se pudo guardar el contenido.';
      if (!silent) {
        setEditorDraftMessages((current) => ({ ...current, [draft.id]: message }));
      }
      return false;
    } finally {
      setEditorSavingIds((current) => ({ ...current, [draft.id]: false }));
    }
  }

  async function handleSaveAllEditorDrafts() {
    if (!editorModuleDrafts.length) return;
    try {
      setEditorSaveAllLoading(true);
      setEditorSaveAllMessage(null);
      let allOk = true;
      for (const draft of editorModuleDrafts) {
        const ok = await saveEditorDraft(draft, true);
        if (!ok) {
          allOk = false;
        }
      }
      setEditorSaveAllMessage(allOk ? 'Todos los contenidos del tema fueron guardados.' : 'Algunos contenidos no se pudieron guardar.');
    } finally {
      setEditorSaveAllLoading(false);
    }
  }

  const selectedCourseModules = selectedCourseDetail
    ? selectedCourseDetail.sections.flatMap((section) =>
        section.modules.map((module) => ({ ...module, sectionName: section.name })),
      )
    : [];
  const selectedCourseModuleTypes = Array.from(
    new Set(selectedCourseModules.map((module) => module.type).filter(Boolean)),
  );
  const selectedCoursePanels = selectedCourseModuleTypes
    .filter((type) => ['forum', 'quiz', 'chat', 'resource', 'folder', 'url', 'assign'].includes(type))
    .map((type) => getModuleTypeLabel(type));
  const adminManagementItems = selectedCourseDetail
    ? [
        'Editar contenido del curso',
        'Configuracion del curso',
        'Usuarios matriculados',
        'Calificaciones',
        'Reporte de actividad',
        ...(questionBankItems.length ? ['Banco de preguntas'] : []),
      ]
    : ['Gestionar cursos', 'Asignar usuarios', 'Matriculas', 'Reportes'];
  const adminNavigation = [
    'Panel principal',
    'Administracion del curso',
    'Editar contenido del curso',
    'Cursos',
    'Participantes',
    'Usuarios',
    'Categorias',
    'Calificaciones',
    ...selectedCoursePanels,
  ];
  const userNavigation = [
    'Panel principal',
    'Mis cursos',
    'Perfil',
    'Calificaciones',
    'Calendario',
    ...selectedCoursePanels,
  ];
  const manageableCourses = courses;
  const visibleUserCourses = user?.courses ?? [];
  const filteredManageableCourses = manageableCourses.filter((course) =>
    `${course.fullname} ${course.shortname} ${course.category?.name ?? ''}`.toLowerCase().includes(courseSearch.toLowerCase()),
  );
  const filteredUsers = users.filter((item) =>
    `${item.fullname} ${item.username} ${item.email ?? ''}`.toLowerCase().includes(userSearch.toLowerCase()),
  );
  const resolveCourseName = (courseId: number) =>
    courses.find((course) => course.id === courseId)?.fullname ??
    visibleUserCourses.find((course) => course.id === courseId)?.fullname ??
    `Curso ${courseId}`;

  function renderParticipantsBlock(items: AulaUser[]) {
    return (
      <div className="space-y-3">
        {items.map((participant) => (
          <div key={participant.id} className="border border-slate-200 bg-[#f8fbff] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#25364f]">{participant.fullname || participant.username}</p>
                <p className="text-xs uppercase tracking-[0.06em] text-slate-500">@{participant.username}</p>
              </div>
              <span className="border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                {participant.canCreateCourse ? 'Administrador' : 'Participante'}
              </span>
            </div>
            <div className="mt-3 text-sm leading-6 text-slate-700">
              <p><strong>Correo:</strong> {participant.email || 'No registrado'}</p>
              <p><strong>ID:</strong> {participant.idnumber || 'No registrado'}</p>
              <p><strong>Telefono:</strong> {participant.phone1 || participant.phone2 || 'No registrado'}</p>
              <p><strong>Direccion:</strong> {participant.address || 'No registrada'}</p>
              <p><strong>Ciudad:</strong> {participant.city || 'No registrada'}</p>
              <p><strong>Pais:</strong> {participant.country || 'No registrado'}</p>
              <p><strong>Institucion:</strong> {participant.institution || 'No registrada'}</p>
              <p><strong>Departamento:</strong> {participant.department || 'No registrado'}</p>
              <p><strong>Zona horaria:</strong> {participant.timezone || 'No registrada'}</p>
              <p><strong>Ultimo acceso:</strong> {formatRelativeAccess(participant.lastaccess)}</p>
              <p><strong>Fecha de acceso:</strong> {formatLastAccess(participant.lastaccess)}</p>
              {participant.preferences?.length ? (
                <p><strong>Preferencias registradas:</strong> {participant.preferences.length}</p>
              ) : null}
              {participant.courseLastAccess?.length ? (
                <p><strong>Accesos por curso registrados:</strong> {participant.courseLastAccess.length}</p>
              ) : null}
              {participant.customFields?.length ? (
                <div className="pt-2">
                  <p><strong>Campos personalizados:</strong></p>
                  {participant.customFields.map((field) => (
                    <p key={`${participant.id}-${field.fieldid}`}>
                      <strong>{field.name || field.shortname}:</strong> {field.data || 'Sin dato'}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderParticipantsPanel() {
    const participantCourseOptions = user?.canCreateCourse ? courses : visibleUserCourses;
    if (!selectedCourseDetail) {
      return (
        <div className="space-y-4">
          <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
            <p className="text-sm text-slate-700">
              Selecciona un curso para ver sus participantes, como en la lista de participantes del aula antigua.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {participantCourseOptions.map((course) => (
              <button
                type="button"
                key={`participants-${course.id}`}
                onClick={() => openCourse(course.id)}
                className="min-w-0 cursor-pointer border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                  {course.category?.name ?? 'Sin categoria'}
                </p>
                <p className="mt-2 text-sm font-bold text-[#25364f]">{course.fullname}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                  {course.enrolments} matriculas
                </p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (participantsLoading) {
      return <p className="text-sm text-slate-700">Cargando participantes del curso...</p>;
    }

    if (!participants.length) {
      return (
        <div className="space-y-4">
          <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
            <p className="text-sm text-slate-700">
              No se encontraron participantes en <strong>{selectedCourseDetail.fullname}</strong>.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Participantes</p>
          <p className="mt-2 text-sm text-slate-700">
            <strong>{selectedCourseDetail.fullname}</strong> - {participants.length} participantes visibles
          </p>
        </div>
        {renderParticipantsBlock(participants)}
      </div>
    );
  }

  function renderCourseManagementBlock() {
    return (
      <div className="space-y-6">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <p className="text-sm text-slate-700">
            Formulario guiado por <strong>course/edit.php</strong>. Se mantiene el listado de cursos a la izquierda y la ficha de configuracion a la derecha.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="space-y-4">
            <input
              className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700"
              placeholder="Buscar curso"
              value={courseSearch}
              onChange={(event) => setCourseSearch(event.target.value)}
            />
            <div className="space-y-3">
              {filteredManageableCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-slate-200 bg-white px-4 py-4"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                    {course.category?.name ?? 'Sin categoria'}
                  </p>
                  <p className="mt-2 text-sm font-bold text-[#25364f]">{course.fullname}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                    {course.shortname} - {course.enrolments} matriculas
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openCourse(course.id)}
                      className="inline-flex cursor-pointer border border-[#0f5ea8] bg-[#eef6ff] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8] transition hover:bg-[#dcecff]"
                    >
                      Abrir curso
                    </button>
                    <button
                      type="button"
                      onClick={() => beginCourseEdit(course)}
                      className="inline-flex cursor-pointer border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8] transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                    >
                      Editar ajustes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                {courseForm.id ? 'Editar curso' : 'Crear curso'}
              </p>
              {courseForm.id ? (
                <button type="button" className="cursor-pointer text-xs font-semibold text-[#0f5ea8]" onClick={resetCourseForm}>
                  Nuevo curso
                </button>
              ) : null}
            </div>
            <form className="mt-4 space-y-3" onSubmit={handleCreateCourse}>
              <input
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                placeholder="Nombre completo"
                value={courseForm.fullname}
                onChange={(event) => setCourseForm((current) => ({ ...current, fullname: event.target.value }))}
              />
              <input
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                placeholder="Nombre corto"
                value={courseForm.shortname}
                onChange={(event) => setCourseForm((current) => ({ ...current, shortname: event.target.value }))}
              />
              <textarea
                className="min-h-[120px] w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                placeholder="Resumen del curso"
                value={courseForm.summary}
                onChange={(event) => setCourseForm((current) => ({ ...current, summary: event.target.value }))}
              />
              <input
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                placeholder="Numero ID"
                value={courseForm.idnumber}
                onChange={(event) => setCourseForm((current) => ({ ...current, idnumber: event.target.value }))}
              />
              <select
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                value={courseForm.category}
                onChange={(event) => setCourseForm((current) => ({ ...current, category: event.target.value }))}
              >
                <option value="">Selecciona categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                value={courseForm.format}
                onChange={(event) => setCourseForm((current) => ({ ...current, format: event.target.value }))}
              >
                <option value="topics">Temas</option>
                <option value="weekly">Semanal</option>
                <option value="social">Social</option>
              </select>
              <div className="grid gap-3 md:grid-cols-2">
                <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Idioma" value={courseForm.lang} onChange={(event) => setCourseForm((current) => ({ ...current, lang: event.target.value }))} />
                <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Tema" value={courseForm.theme} onChange={(event) => setCourseForm((current) => ({ ...current, theme: event.target.value }))} />
                <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Tipo de calendario" value={courseForm.calendartype} onChange={(event) => setCourseForm((current) => ({ ...current, calendartype: event.target.value }))} />
                <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Noticias" value={courseForm.newsitems} onChange={(event) => setCourseForm((current) => ({ ...current, newsitems: event.target.value }))} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={courseForm.visible} onChange={(event) => setCourseForm((current) => ({ ...current, visible: event.target.value }))}>
                  <option value="1">Visible</option>
                  <option value="0">Oculto</option>
                </select>
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={courseForm.showgrades} onChange={(event) => setCourseForm((current) => ({ ...current, showgrades: event.target.value }))}>
                  <option value="1">Mostrar calificaciones</option>
                  <option value="0">Ocultar calificaciones</option>
                </select>
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={courseForm.showreports} onChange={(event) => setCourseForm((current) => ({ ...current, showreports: event.target.value }))}>
                  <option value="0">Sin informes de actividad</option>
                  <option value="1">Mostrar informes de actividad</option>
                </select>
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={courseForm.enablecompletion} onChange={(event) => setCourseForm((current) => ({ ...current, enablecompletion: event.target.value }))}>
                  <option value="0">Sin finalizacion</option>
                  <option value="1">Con finalizacion</option>
                </select>
              </div>
              <button
                type="submit"
                className="inline-flex cursor-pointer bg-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white"
                disabled={courseFormLoading}
              >
                {courseFormLoading ? 'Guardando...' : courseForm.id ? 'Guardar cambios' : 'Crear curso'}
              </button>
              {courseFormMessage ? <p className="text-sm text-slate-700">{courseFormMessage}</p> : null}
            </form>
          </div>
        </div>
      </div>
    );
  }

  function renderUsersManagementBlock() {
    return (
      <div className="space-y-6">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <p className="text-sm text-slate-700">
            Gestion de usuarios y alumnos heredada del aula antigua. Aqui puedes revisar las cuentas recuperadas y sus matriculas.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-4">
            <input
              className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700"
              placeholder="Buscar usuario, alumno o correo"
              value={userSearch}
              onChange={(event) => setUserSearch(event.target.value)}
            />
            <div className="space-y-3">
              {filteredUsers.map((item) => (
                <div key={item.id} className="border border-slate-200 bg-white px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#25364f]">{item.fullname || item.username}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                        @{item.username} - {item.email || 'Sin correo'}
                      </p>
                    </div>
                    <span className="border border-slate-300 bg-[#f8fbff] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                      {item.canCreateCourse ? 'Administrador' : 'Alumno'}
                    </span>
                  </div>
                    <div className="mt-3 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                      <div className="text-sm leading-6 text-slate-700">
                        <p><strong>ID:</strong> {item.idnumber || 'No registrado'}</p>
                        <p><strong>Telefono:</strong> {item.phone1 || item.phone2 || 'No registrado'}</p>
                        <p><strong>Direccion:</strong> {item.address || 'No registrada'}</p>
                        <p><strong>Ultimo acceso:</strong> {formatLastAccess(item.lastaccess)}</p>
                        <p><strong>Pais:</strong> {item.country || 'No registrado'}</p>
                        <p><strong>Ciudad:</strong> {item.city || 'No registrada'}</p>
                        <p><strong>Institucion:</strong> {item.institution || 'No registrada'}</p>
                        <p><strong>Departamento:</strong> {item.department || 'No registrado'}</p>
                        <p><strong>Auth:</strong> {item.auth || 'manual'}</p>
                        {item.preferences?.length ? (
                          <p><strong>Preferencias:</strong> {item.preferences.length}</p>
                        ) : null}
                        {item.courseLastAccess?.length ? (
                          <p><strong>Accesos por curso:</strong> {item.courseLastAccess.length}</p>
                        ) : null}
                        {item.customFields?.length ? (
                          <div className="pt-2">
                            <p><strong>Campos personalizados:</strong></p>
                            {item.customFields.map((field) => (
                              <p key={`${item.id}-${field.fieldid}`}>
                                <strong>{field.name || field.shortname}:</strong> {field.data || 'Sin dato'}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Cursos</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(item.courses ?? []).length ? (
                          item.courses?.map((course) => (
                            <button
                              type="button"
                              key={`${item.id}-${course.id}`}
                              onClick={() => openCourse(course.id)}
                              className="cursor-pointer border border-slate-300 bg-[#f8fbff] px-3 py-2 text-xs font-semibold text-[#25364f] transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                            >
                              {course.shortname}
                            </button>
                          ))
                        ) : (
                          <span className="text-sm text-slate-700">Sin cursos matriculados.</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => beginUserEdit(item)}
                      className="cursor-pointer border border-slate-300 bg-[#f8fbff] px-3 py-2 text-xs font-semibold text-[#25364f] transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                    >
                      Editar perfil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                {userForm.id ? 'Editar usuario' : 'Crear usuario'}
              </p>
              {userForm.id ? (
                <button type="button" className="cursor-pointer text-xs font-semibold text-[#0f5ea8]" onClick={resetUserForm}>
                  Nuevo usuario
                </button>
              ) : null}
            </div>
            <form className="mt-4 space-y-3" onSubmit={handleCreateUser}>
              <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Usuario" value={userForm.username} onChange={(event) => setUserForm((current) => ({ ...current, username: event.target.value }))} />
              <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Correo" value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} />
              <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Nombres" value={userForm.firstname} onChange={(event) => setUserForm((current) => ({ ...current, firstname: event.target.value }))} />
              <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Apellidos" value={userForm.lastname} onChange={(event) => setUserForm((current) => ({ ...current, lastname: event.target.value }))} />
              <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Ciudad" value={userForm.city} onChange={(event) => setUserForm((current) => ({ ...current, city: event.target.value }))} />
              <input className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder="Pais" value={userForm.country} onChange={(event) => setUserForm((current) => ({ ...current, country: event.target.value }))} />
              <div className="grid gap-3 md:grid-cols-2">
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={userForm.auth} onChange={(event) => setUserForm((current) => ({ ...current, auth: event.target.value }))}>
                  <option value="manual">manual</option>
                </select>
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={userForm.confirmed} onChange={(event) => setUserForm((current) => ({ ...current, confirmed: event.target.value }))}>
                  <option value="1">Confirmado</option>
                  <option value="0">No confirmado</option>
                </select>
                <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={userForm.suspended} onChange={(event) => setUserForm((current) => ({ ...current, suspended: event.target.value }))}>
                  <option value="0">Activo</option>
                  <option value="1">Suspendido</option>
                </select>
                <input type="password" className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" placeholder={userForm.id ? 'Nueva contrasena (opcional)' : 'Contrasena'} value={userForm.password} onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))} />
              </div>
              <button type="submit" className="inline-flex cursor-pointer bg-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white" disabled={userFormLoading}>
                {userFormLoading ? 'Guardando...' : userForm.id ? 'Guardar cambios' : 'Crear usuario'}
              </button>
              {userFormMessage ? <p className="text-sm text-slate-700">{userFormMessage}</p> : null}
            </form>
          </div>
        </div>
      </div>
    );
  }

  function renderEnrolmentsBlock() {
    return (
      <div className="space-y-6">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <p className="text-sm text-slate-700">
            Vista de matrículas del aula. Se muestran usuarios recuperados y los cursos a los que están vinculados.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-3">
            {filteredUsers.map((item) => (
              <div key={item.id} className="border border-slate-200 bg-white px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#25364f]">{item.fullname || item.username}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">@{item.username}</p>
                  </div>
                  <span className="text-xs text-slate-500">{(item.courses ?? []).length} cursos</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(item.courses ?? []).length ? (
                    item.courses?.map((course) => (
                      <button
                        type="button"
                        key={`${item.id}-${course.id}-enrol`}
                        onClick={() => openCourse(course.id)}
                        className="cursor-pointer border border-slate-300 bg-[#f8fbff] px-3 py-2 text-xs font-semibold text-[#25364f] transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                      >
                        {course.fullname}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm text-slate-700">Sin matrículas registradas.</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Matricular usuario</p>
            <form className="mt-4 space-y-3" onSubmit={handleCreateEnrolment}>
              <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={enrolForm.userId} onChange={(event) => setEnrolForm((current) => ({ ...current, userId: event.target.value }))}>
                <option value="">Selecciona usuario</option>
                {users.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.fullname || item.username}
                  </option>
                ))}
              </select>
              <select className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700" value={enrolForm.courseId} onChange={(event) => setEnrolForm((current) => ({ ...current, courseId: event.target.value }))}>
                <option value="">Selecciona curso</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.fullname}
                  </option>
                ))}
              </select>
              <button type="submit" className="inline-flex cursor-pointer bg-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white" disabled={enrolFormLoading}>
                {enrolFormLoading ? 'Matriculando...' : 'Registrar matricula'}
              </button>
              {enrolFormMessage ? <p className="text-sm text-slate-700">{enrolFormMessage}</p> : null}
            </form>
          </div>
        </div>
      </div>
    );
  }

  function renderReportsBlock() {
    const reportTabs: AulaReportView[] = ['Calificador', 'Vista general', 'Informe de usuario', 'Historial'];

    return (
      <div className="space-y-6">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <p className="text-sm text-slate-700">
            Vista guiada por los reportes de Moodle: <strong>grader</strong>, <strong>overview</strong>, <strong>user</strong> e <strong>history</strong>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {reportTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setReportView(tab)}
              className={`cursor-pointer border px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
                reportView === tab ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#0f5ea8]' : 'border-slate-300 bg-white text-[#25364f] hover:border-[#0f5ea8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {reportView === 'Calificador' ? (
          <div className="space-y-4">
            <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
              <p><strong>Curso:</strong> {selectedCourseDetail?.fullname || 'Aula virtual'}</p>
              <p><strong>Participantes:</strong> {gradeRows.length}</p>
              <p><strong>Columnas de calificacion:</strong> {gradeItems.length}</p>
            </div>
            {renderGradesBlock()}
          </div>
        ) : reportView === 'Vista general' ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Resumen del aula</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p><strong>Cursos:</strong> {summary?.courseCount ?? 0}</p>
                <p><strong>Usuarios:</strong> {summary?.activeUserCount ?? 0}</p>
                <p><strong>Matriculas:</strong> {summary?.enrolmentCount ?? 0}</p>
                <p><strong>Categorias:</strong> {summary?.categoryCount ?? 0}</p>
              </div>
            </div>
            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Modulos del curso</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(summary?.moduleTypes ?? []).map((type) => (
                  <span key={type} className="border border-slate-300 bg-[#f8fbff] px-3 py-2 text-xs font-semibold text-[#25364f]">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : reportView === 'Informe de usuario' ? (
          <div className="space-y-3">
            {gradeRows.map((row) => (
              <div key={row.user.id} className="border border-slate-200 bg-white px-4 py-4">
                <p className="font-semibold text-[#25364f]">{row.user.fullname}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">@{row.user.username}</p>
                <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {row.grades.map((grade) => {
                    const item = gradeItems.find((entry) => entry.id === grade.itemid);
                    return (
                      <div key={`${row.user.id}-${grade.itemid}`} className="border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
                        <p className="font-semibold text-[#25364f]">{item?.name || 'Item'}</p>
                        <p className="mt-1">Nota final: {grade.finalgrade ?? grade.rawgrade ?? '-'}</p>
                        <p>Retroalimentacion: {grade.feedback || 'Sin comentario'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {activityItems.length ? (
              activityItems.map((item) => (
                <div key={item.id} className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
                  <p className="font-semibold text-[#25364f]">{item.user?.fullname ?? 'Sistema'}</p>
                  <p className="mt-1">{item.action} - {item.target}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">{formatLastAccess(item.timecreated)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-700">No hay movimientos recientes para mostrar en el historial.</p>
            )}
          </div>
        )}
      </div>
    );
  }

  function renderCourseAdminUtilityBlock(
    title: string,
    description: string,
    items: string[] = [],
  ) {
    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">{title}</p>
          <p className="mt-2">{description}</p>
        </div>
        {items.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div key={item} className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  function renderGroupsManagementBlock() {
    const groupedParticipants = participants.reduce<Record<string, AulaUser[]>>((accumulator, participant) => {
      const key = (participant.lastname?.trim()?.[0] || participant.firstname?.trim()?.[0] || '#').toUpperCase();
      accumulator[key] = accumulator[key] ?? [];
      accumulator[key].push(participant);
      return accumulator;
    }, {});

    const keys = Object.keys(groupedParticipants).sort();
    const selectedGroup = keys[0];
    const groupedMembers = selectedGroup ? groupedParticipants[selectedGroup] : [];
    const availableMembers = participants.filter((participant) => !groupedMembers.some((member) => member.id === participant.id));

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Grupos</p>
          <p className="mt-2">Vista de gestion de grupos del curso, con panel de grupos y listas de miembros como en la administracion antigua.</p>
        </div>
        {keys.length ? (
          <>
            <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
              <div className="border border-slate-200 bg-white px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Grupos</p>
                <div className="mt-3 space-y-2">
                  {keys.map((key) => (
                    <div key={key} className={`border px-3 py-3 text-sm ${key === selectedGroup ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#0f5ea8]' : 'border-slate-200 bg-[#f8fbff] text-slate-700'}`}>
                      <p className="font-semibold">Grupo {key}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.06em]">{groupedParticipants[key].length} miembros</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <div className="border border-slate-200 bg-white px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Miembros del grupo {selectedGroup}</p>
                  <div className="mt-3 space-y-2">
                    {groupedMembers.map((participant) => (
                      <div key={participant.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
                        <p className="font-semibold text-[#25364f]">{participant.fullname || participant.username}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">@{participant.username}</p>
                        <p className="mt-1 text-xs text-slate-500">{participant.city || 'Sin ciudad'} / {participant.country || 'Sin pais'}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-slate-200 bg-white px-4 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Miembros potenciales</p>
                  <div className="mt-3 space-y-2">
                    {availableMembers.length ? availableMembers.map((participant) => (
                      <div key={participant.id} className="border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
                        <p className="font-semibold text-[#25364f]">{participant.fullname || participant.username}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">@{participant.username}</p>
                      </div>
                    )) : <p className="text-sm text-slate-700">No hay mas miembros potenciales visibles.</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
              <p><strong>Modo de grupos:</strong> sin datos explicitos en el backup, se presenta una administracion navegable con miembros visibles del curso.</p>
            </div>
          </>
        ) : <p className="text-sm text-slate-700">No se encontraron participantes para agrupar.</p>}
      </div>
    );
  }

  function renderPermissionsManagementBlock() {
    const rows = [
      ['moodle/course:update', 'Permitir', 'No establecido', 'Editar ajustes del curso'],
      ['moodle/course:manageactivities', 'Permitir', 'No establecido', 'Gestionar actividades'],
      ['moodle/site:viewreports', 'Permitir', 'No establecido', 'Ver informes'],
      ['moodle/grade:viewall', 'Permitir', 'No establecido', 'Ver calificaciones completas'],
      ['enrol/manual:enrol', user?.canCreateCourse ? 'Permitir' : 'No', 'No establecido', 'Matricular usuarios'],
      ['moodle/course:view', 'Permitir', 'Permitir', 'Entrar al curso'],
      ['mod/forum:viewdiscussion', 'Permitir', 'Permitir', 'Ver discusiones'],
      ['mod/quiz:view', 'Permitir', 'Permitir', 'Ver cuestionarios'],
    ];

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Permisos</p>
          <p className="mt-2">Tabla de capacidades en el contexto del curso, con columnas de administrador y alumno como referencia del aula antigua.</p>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm text-slate-700">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Capacidad</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Administrador</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Alumno</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Uso</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([capability, adminState, studentState, usage]) => (
              <tr key={capability}>
                <td className="border border-slate-200 px-3 py-2">{capability}</td>
                <td className="border border-slate-200 px-3 py-2">{adminState}</td>
                <td className="border border-slate-200 px-3 py-2">{studentState}</td>
                <td className="border border-slate-200 px-3 py-2">{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

  function renderPermissionCheckBlock() {
    const rows = [
      ['Administrador', 'Si', 'Si', 'Si', 'Si', 'Consistente'],
      ['Alumno', 'No', 'No', 'Si', 'Segun item', 'Restringido'],
    ];

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Comprobar permisos</p>
          <p className="mt-2">Chequeo resumido de capacidades por perfil, inspirado en `roles/check.php` del Moodle antiguo.</p>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm text-slate-700">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Perfil</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Editar curso</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Matricular</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Ver curso</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Ver notas</th>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={`${row[0]}-${cell}`} className="border border-slate-200 px-3 py-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

  function renderBackupManagementBlock() {
    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Copia de respaldo</p>
          <p className="mt-2">Prepara una exportacion del curso abierto con secciones, participantes, notas, eventos y actividad reciente.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"><strong>Secciones:</strong> {selectedCourseDetail?.sections.length ?? 0}</div>
          <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"><strong>Participantes:</strong> {participants.length}</div>
          <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"><strong>Items de nota:</strong> {gradeItems.length}</div>
          <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"><strong>Eventos:</strong> {events.length}</div>
        </div>
        <button type="button" onClick={handleDownloadCourseBackup} className="inline-flex cursor-pointer border border-[#0f5ea8] bg-[#eef6ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
          Descargar respaldo del curso
        </button>
        {adminActionMessage ? <p className="text-sm text-slate-700">{adminActionMessage}</p> : null}
      </div>
    );
  }

  function renderRestoreManagementBlock() {
    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Restaurar</p>
          <p className="mt-2">Usa la fuente local del SQL, moodledata y metadata viva ya recuperada para refrescar el curso.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Fuente SQL: `alph5674_mood307.sql`</div>
              <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Archivos: `moodledata-2`</div>
              <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">Metadata: viva + backup local</div>
            </div>
            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Curso destino</p>
              <p className="mt-2 text-sm font-semibold text-[#25364f]">{selectedCourseDetail?.fullname || 'Sin curso abierto'}</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p><strong>Secciones:</strong> {selectedCourseDetail?.sections.length ?? 0}</p>
                <p><strong>Participantes:</strong> {participants.length}</p>
                <p><strong>Eventos:</strong> {events.length}</p>
                <p><strong>Actividad reciente:</strong> {activityItems.length}</p>
              </div>
            </div>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Acciones de restauracion</p>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <p>1. Validar la fuente recuperada.</p>
              <p>2. Recargar catalogo y detalle del curso.</p>
              <p>3. Volver a leer materiales, participantes, notas, eventos y actividad.</p>
            </div>
            <button type="button" onClick={handleReloadRecovery} className="mt-4 inline-flex cursor-pointer border border-[#0f5ea8] bg-[#eef6ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
              Recargar desde backup
            </button>
            {adminActionMessage ? <p className="mt-3 text-sm text-slate-700">{adminActionMessage}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  function renderImportManagementBlock() {
    const sourceCourses = courses.filter((course) => course.id !== selectedCourseDetail?.id).slice(0, 12);

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Importar</p>
          <p className="mt-2">Selecciona un curso origen para revisar su estructura antes de importar contenidos, como en el flujo antiguo.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {sourceCourses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => openCourse(course.id)}
                className="cursor-pointer border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
              >
                <p className="font-semibold text-[#25364f]">{course.fullname}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">{course.shortname}</p>
                <p className="mt-2 text-xs text-slate-500">{course.category?.name || 'Sin categoria'} / {course.enrolments} matriculas</p>
              </button>
            ))}
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Flujo de importacion</p>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              <p>1. Elegir el curso origen.</p>
              <p>2. Revisar estructura, topicos y materiales.</p>
              <p>3. Aplicar importacion sobre el curso actual.</p>
            </div>
            <div className="mt-4 border border-slate-200 bg-[#f8fbff] px-4 py-3 text-sm text-slate-700">
              <p><strong>Curso destino:</strong> {selectedCourseDetail?.fullname || 'Sin curso abierto'}</p>
              <p><strong>Formato:</strong> {selectedCourseDetail?.format || 'No disponible'}</p>
              <p><strong>Categoria:</strong> {selectedCourseDetail?.category?.name || 'Sin categoria'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderResetManagementBlock() {
    return (
      <div className="space-y-4">
        <div className="border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-900">
          <p className="font-semibold">Reiniciar</p>
          <p className="mt-2">En Moodle esta opcion afecta usuarios, eventos y actividad. Aqui se deja como pantalla de revision y no ejecuta cambios destructivos.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Participantes:</strong> {participants.length}</div>
          <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Eventos:</strong> {events.length}</div>
          <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Actividad:</strong> {activityItems.length}</div>
        </div>
      </div>
    );
  }

  function renderEnrolledUsersBlock() {
    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Usuarios matriculados</p>
          <p className="mt-2">Vista inspirada en `enrol/manual/manage.php` y `user/index.php`, con usuarios inscritos y candidatos visibles del aula.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]">
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Usuarios inscritos</p>
            <div className="mt-3 space-y-2">
              {participants.length ? participants.map((participant) => (
                <div key={participant.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
                  <p className="font-semibold text-[#25364f]">{participant.fullname || participant.username}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">@{participant.username}</p>
                  <p className="mt-1 text-xs text-slate-500">{participant.city || 'Sin ciudad'} / {participant.country || 'Sin pais'}</p>
                </div>
              )) : <p className="text-sm text-slate-700">No hay usuarios inscritos en este curso.</p>}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="space-y-3 text-center">
              <div className="border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#25364f]">&lt;&lt;</div>
              <div className="border border-slate-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#25364f]">&gt;&gt;</div>
            </div>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Candidatos a matricula</p>
            <div className="mt-3 space-y-2">
              {users.filter((item) => !participants.some((participant) => participant.id === item.id)).slice(0, 20).map((item) => (
                <div key={item.id} className="border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
                  <p className="font-semibold text-[#25364f]">{item.fullname || item.username}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">@{item.username}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCourseContentEditorBlock() {
    if (!selectedCourseDetail) {
      return (
        <div className="space-y-4">
          <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
            <p className="font-semibold text-[#25364f]">Editar contenido del curso</p>
            <p className="mt-2">Selecciona un curso para ver sus temas y su contenido existente.</p>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <select
              className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
              value=""
              onChange={(event) => {
                const courseId = Number(event.target.value);
                if (courseId) {
                    void openCourse(courseId, 'Editar contenido del curso');
                }
              }}
            >
              <option value="">Selecciona curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.fullname}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    const selectedEditorSection = selectedCourseDetail.sections.find(
      (section) => String(section.id) === editorSectionId,
    );

    return (
      <div className="space-y-6">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Editar contenido del curso</p>
          <p className="mt-2">
            Aqui puedes crear temas y agregar contenido como texto informativo, material de apoyo, imagenes y enlaces de sesion virtual.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Curso seleccionado</p>
              <div className="mt-3 space-y-3">
                <div className="border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
                  <p className="font-semibold text-[#25364f]">{selectedCourseDetail.fullname}</p>
                  <p className="mt-1 text-xs text-slate-500">{selectedCourseDetail.shortname}</p>
                </div>
                <select
                  className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  value={selectedCourseDetail.id}
                  onChange={(event) => {
                    const courseId = Number(event.target.value);
                    if (courseId && courseId !== selectedCourseDetail.id) {
                      void openCourse(courseId, 'Editar contenido del curso');
                    }
                  }}
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.fullname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Temas actuales</p>
              <div className="mt-3 space-y-3">
                {selectedCourseDetail.sections.map((section) => (
                  <div
                    key={section.id}
                    className={`border px-3 py-3 text-sm transition ${
                        String(section.id) === editorSectionId
                        ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#25364f]'
                        : 'border-slate-200 bg-[#f8fbff] text-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                        onClick={() => selectEditorSection(String(section.id))}
                        className="block w-full cursor-pointer text-left"
                      >
                      <p className="font-semibold text-[#25364f]">{section.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Tema {section.number} / {(section.modules ?? []).length} elementos
                      </p>
                      {section.summary ? <p className="mt-2 text-sm leading-6 text-slate-700">{section.summary}</p> : null}
                    </button>
                      {(section.modules ?? []).length ? (
                        <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                          {section.modules.map((module) => (
                            <div key={module.id} className="border border-slate-200 bg-white px-3 py-3">
                              <div>
                                <p className="font-semibold text-[#25364f]">{module.name}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                                  {module.type}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Crear tema</p>
              <form className="mt-4 space-y-3" onSubmit={handleCreateSection}>
                <input
                  className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  placeholder="Nombre del tema"
                  value={sectionForm.name}
                  onChange={(event) => setSectionForm((current) => ({ ...current, name: event.target.value }))}
                />
                <textarea
                  className="min-h-[120px] w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  placeholder="Resumen del tema"
                  value={sectionForm.summary}
                  onChange={(event) => setSectionForm((current) => ({ ...current, summary: event.target.value }))}
                />
                <button
                  type="submit"
                  className="inline-flex cursor-pointer bg-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white"
                  disabled={sectionFormLoading}
                >
                  {sectionFormLoading ? 'Creando...' : 'Crear tema'}
                </button>
                {sectionFormMessage ? <p className="text-sm text-slate-700">{sectionFormMessage}</p> : null}
              </form>
            </div>
          </div>

          <div className="border border-slate-200 bg-white px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                {moduleForm.id ? 'Editar contenido del tema' : 'Agregar contenido al tema'}
              </p>
              {moduleForm.id ? (
                <button
                  type="button"
                  onClick={resetModuleForm}
                  className="inline-flex cursor-pointer border border-slate-300 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#25364f]"
                >
                  Nuevo contenido
                </button>
              ) : null}
            </div>
            {selectedEditorSection ? (
              <div className="mt-3 border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
                <p>
                  <strong>Tema seleccionado:</strong> {selectedEditorSection.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tema {selectedEditorSection.number} / {(selectedEditorSection.modules ?? []).length} elementos actuales
                </p>
              </div>
            ) : null}
            <form className="mt-4 space-y-3" onSubmit={handleCreateModule}>
              <select
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  value={editorSectionId}
                  onChange={(event) => selectEditorSection(event.target.value)}
                >
                <option value="">Selecciona tema</option>
                {selectedCourseDetail.sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                value={moduleForm.kind}
                onChange={(event) => setModuleForm((current) => ({ ...current, kind: event.target.value, externalUrl: '' }))}
              >
                <option value="label">Texto informativo</option>
                <option value="material">Material de apoyo</option>
                <option value="image">Imagen</option>
                <option value="url">Link de sesion virtual</option>
              </select>
              <input
                className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                placeholder="Titulo del contenido"
                value={moduleForm.name}
                onChange={(event) => setModuleForm((current) => ({ ...current, name: event.target.value }))}
              />
              <textarea
                className="min-h-[140px] w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                placeholder={moduleForm.kind === 'label' ? 'Texto informativo del tema' : 'Descripcion o apoyo para este contenido'}
                value={moduleForm.intro}
                onChange={(event) => setModuleForm((current) => ({ ...current, intro: event.target.value }))}
              />

              {moduleForm.kind === 'url' ? (
                <input
                  className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  placeholder="https://..."
                  value={moduleForm.externalUrl}
                  onChange={(event) => setModuleForm((current) => ({ ...current, externalUrl: event.target.value }))}
                />
              ) : null}

              {moduleForm.kind === 'material' ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Archivo del material</p>
                  <input
                    type="file"
                    className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    onChange={(event) => setMaterialFile(event.target.files?.[0] ?? null)}
                  />
                </div>
              ) : null}

              {moduleForm.kind === 'image' ? (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Imagen del tema</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                  />
                </div>
              ) : null}

              <button
                type="submit"
                className="inline-flex cursor-pointer bg-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white"
                disabled={moduleFormLoading}
              >
                {moduleFormLoading ? 'Guardando...' : moduleForm.id ? 'Guardar cambios' : 'Agregar contenido'}
              </button>
              {moduleFormMessage ? <p className="text-sm text-slate-700">{moduleFormMessage}</p> : null}
            </form>
              {selectedEditorSection ? (
                <div className="mt-6 space-y-6">
                  <div className="border border-slate-200 bg-white px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                        Contenido actual del tema
                      </p>
                      {editorModuleDrafts.length ? (
                        <button
                          type="button"
                          onClick={() => void handleSaveAllEditorDrafts()}
                          className="inline-flex cursor-pointer bg-[#0f5ea8] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white"
                          disabled={editorSaveAllLoading}
                        >
                          {editorSaveAllLoading ? 'Guardando todo...' : 'Guardar todo'}
                        </button>
                      ) : null}
                    </div>
                    {editorSaveAllMessage ? <p className="mt-3 text-sm text-slate-700">{editorSaveAllMessage}</p> : null}
                    <div className="mt-4 space-y-4">
                      {editorModuleDrafts.length ? (
                        editorModuleDrafts.map((draft, index) => (
                          <div key={draft.id} className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                                  {draft.kind === 'url' ? 'link de sesion virtual' : draft.kind === 'label' ? 'texto informativo' : draft.kind === 'image' ? 'imagen' : 'material de apoyo'}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-[#25364f]">Contenido {index + 1}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => void saveEditorDraft(draft)}
                                className="inline-flex cursor-pointer border border-[#0f5ea8] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
                                disabled={Boolean(editorSavingIds[draft.id])}
                              >
                                {editorSavingIds[draft.id] ? 'Guardando...' : 'Guardar'}
                              </button>
                            </div>

                            <div className="mt-4 grid gap-3">
                              <select
                                className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                                value={draft.kind}
                                onChange={(event) =>
                                  updateEditorDraft(draft.id, (current) => ({
                                    ...current,
                                    kind: event.target.value,
                                    externalUrl: event.target.value === 'url' ? current.externalUrl : '',
                                  }))
                                }
                              >
                                <option value="label">Texto informativo</option>
                                <option value="material">Material de apoyo</option>
                                <option value="image">Imagen</option>
                                <option value="url">Link de sesion virtual</option>
                              </select>
                              <input
                                className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                                value={draft.name}
                                placeholder="Titulo del contenido"
                                onChange={(event) => updateEditorDraft(draft.id, (current) => ({ ...current, name: event.target.value }))}
                              />
                              <textarea
                                className="min-h-[120px] w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                                value={draft.intro}
                                placeholder={draft.kind === 'label' ? 'Texto informativo del tema' : 'Descripcion o apoyo para este contenido'}
                                onChange={(event) => updateEditorDraft(draft.id, (current) => ({ ...current, intro: event.target.value }))}
                              />
                              {draft.kind === 'url' ? (
                                <input
                                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                                  value={draft.externalUrl}
                                  placeholder="https://..."
                                  onChange={(event) => updateEditorDraft(draft.id, (current) => ({ ...current, externalUrl: event.target.value }))}
                                />
                              ) : null}
                              {draft.kind === 'material' ? (
                                <input
                                  type="file"
                                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                                  onChange={(event) => updateEditorDraft(draft.id, (current) => ({ ...current, materialFile: event.target.files?.[0] ?? null }))}
                                />
                              ) : null}
                              {draft.kind === 'image' ? (
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                                  onChange={(event) => updateEditorDraft(draft.id, (current) => ({ ...current, imageFile: event.target.files?.[0] ?? null }))}
                                />
                              ) : null}
                            </div>

                            {draft.attachments.length ? (
                              <div className="mt-3 space-y-2">
                                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Archivos actuales</p>
                                {draft.attachments.map((attachment) => (
                                  <div key={attachment.id} className="flex flex-wrap items-center justify-between gap-3 border border-slate-200 bg-white px-3 py-3">
                                    <div>
                                      <p className="font-semibold text-[#25364f]">{attachment.filename}</p>
                                      <p className="mt-1 text-xs text-slate-500">{attachment.mimetype || 'Archivo'}</p>
                                    </div>
                                    <a
                                      href={getAttachmentUrl(attachment)}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex cursor-pointer border border-[#0f5ea8] bg-[#eef6ff] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
                                    >
                                      Abrir
                                    </a>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                            {editorDraftMessages[draft.id] ? <p className="mt-3 text-sm text-slate-700">{editorDraftMessages[draft.id]}</p> : null}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-700">Este tema todavia no tiene contenido cargado.</p>
                      )}
                    </div>
                  </div>
                  {editorModuleDrafts.length ? (
                    <div className="border border-slate-200 bg-white px-4 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Mini preview del tema</p>
                      <div className="mt-4 space-y-4">
                        {editorModuleDrafts.map((draft) => (
                          <div key={`preview-${draft.id}`} className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
                            <p className="font-semibold text-[#25364f]">{draft.name || 'Sin titulo'}</p>
                            {draft.intro ? <div className="mt-2 text-sm leading-7 text-slate-700 whitespace-pre-wrap">{draft.intro}</div> : null}
                            {draft.externalUrl ? <p className="mt-2 text-sm text-[#0f5ea8]">{draft.externalUrl}</p> : null}
                            {draft.materialFile ? <p className="mt-2 text-sm text-slate-600">Archivo nuevo: {draft.materialFile.name}</p> : null}
                            {draft.imageFile ? <p className="mt-2 text-sm text-slate-600">Imagen nueva: {draft.imageFile.name}</p> : null}
                            {!draft.materialFile && !draft.imageFile && draft.attachments.length ? (
                              <div className="mt-2 space-y-1">
                                {draft.attachments.map((attachment) => (
                                  <p key={`preview-attachment-${attachment.id}`} className="text-sm text-slate-600">
                                    Archivo actual: {attachment.filename}
                                  </p>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
    );
  }

  function renderCourseSettingsBlock() {
    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          <p className="font-semibold text-[#25364f]">Configuracion del curso</p>
          <p className="mt-2">Ficha de ajustes del curso basada en `course/edit.php`, con los campos principales del formulario antiguo.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Nombre completo:</strong> {selectedCourseDetail?.fullname}</div>
            <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Nombre corto:</strong> {selectedCourseDetail?.shortname}</div>
            <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Categoria:</strong> {selectedCourseDetail?.category?.name ?? 'Sin categoria'}</div>
            <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Formato:</strong> {selectedCourseDetail?.format}</div>
            <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Visible:</strong> {selectedCourseDetail?.visible ? 'Si' : 'No'}</div>
            <div className="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"><strong>Matriculas:</strong> {selectedCourseDetail?.enrolments ?? 0}</div>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Acciones</p>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                onClick={() => {
                  const matchingCourse = courses.find((course) => course.id === selectedCourseDetail?.id);
                  if (matchingCourse) {
                    beginCourseEdit(matchingCourse);
                    setActivePanel('Gestionar cursos');
                  }
                }}
                className="inline-flex cursor-pointer border border-[#0f5ea8] bg-[#eef6ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
              >
                Editar ajustes
              </button>
              <p className="text-sm text-slate-700">Desde aqui puedes saltar al formulario de edicion del curso sin salir del panel admin.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderGradesBlock() {
    if (!selectedCourseDetail) {
      return <p>Abre un curso para ver sus calificaciones.</p>;
    }

    if (!gradeItems.length) {
      return <p>No se encontraron calificaciones registradas en este curso.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm text-slate-700">
          <thead>
            <tr>
              <th className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">Participante</th>
              {gradeItems.map((item) => (
                <th key={item.id} className="border border-slate-200 bg-[#eef3f7] px-3 py-2 text-left">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gradeRows.map((row) => (
              <tr key={row.user.id}>
                <td className="border border-slate-200 px-3 py-2">
                  <div className="font-semibold text-[#25364f]">{row.user.fullname}</div>
                  <div className="text-xs text-slate-500">@{row.user.username}</div>
                </td>
                {row.grades.map((grade) => (
                  <td key={`${row.user.id}-${grade.itemid}`} className="border border-slate-200 px-3 py-2">
                    {grade.finalgrade ?? grade.rawgrade ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderQuestionBankBlock() {
    if (!selectedCourseDetail) {
      return <p>Abre un curso para revisar su banco de preguntas.</p>;
    }

    if (!questionBankItems.length) {
      return <p>No se encontraron preguntas asociadas a los cuestionarios de este curso.</p>;
    }

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4 text-sm text-slate-700">
          Banco de preguntas asociado a <strong>{selectedCourseDetail.fullname}</strong>.
        </div>
        {questionBankItems.map((question) => (
          <div key={question.id} className="border border-slate-200 bg-white px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                  {question.qtype}
                </p>
                <h5 className="mt-1 text-sm font-bold text-[#25364f]">{question.name}</h5>
                <p className="mt-1 text-xs text-slate-500">
                  {question.category?.name ?? 'Sin categoria'} - Puntaje {question.defaultmark}
                </p>
              </div>
              <div className="text-right text-xs text-slate-500">
                {question.usages.map((usage) => (
                  <p key={`${question.id}-${usage.quizId}-${usage.slot}`}>
                    {usage.quizName} / Slot {usage.slot}
                  </p>
                ))}
              </div>
            </div>
            {question.questiontext ? (
              <p className="mt-3 text-sm leading-7 text-slate-700">{question.questiontext}</p>
            ) : null}
            {question.answers.length ? (
              <div className="mt-3 space-y-2">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
                    <p>{answer.answer || 'Respuesta sin texto visible.'}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Fraccion: {answer.fraction}
                      {answer.feedback ? ` / Feedback: ${answer.feedback}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-slate-500">Esta pregunta no trae respuestas visibles en el dump.</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  function getAttachmentUrl(attachment: AulaAttachment) {
    if (/^https?:\/\//i.test(attachment.url)) {
      return attachment.url;
    }
    return `${AULA_SERVER_BASE}${attachment.url}`;
  }

  function getPreviewKind(attachment: AulaAttachment) {
    const mime = String(attachment.mimetype || '').toLowerCase();
    const filename = String(attachment.filename || '').toLowerCase();

    if (mime.includes('pdf') || filename.endsWith('.pdf')) {
      return 'pdf';
    }
    if (mime.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(filename)) {
      return 'image';
    }
    if (mime.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(filename)) {
      return 'video';
    }
    if (
      mime.includes('powerpoint') ||
      mime.includes('presentation') ||
      /\.(ppt|pptx|pps|ppsx)$/i.test(filename)
    ) {
      return 'powerpoint';
    }

    return 'none';
  }

  function renderAttachmentPreview(attachment: AulaAttachment) {
    const previewKind = getPreviewKind(attachment);
    const attachmentUrl = getAttachmentUrl(attachment);

    if (previewKind === 'pdf') {
      return (
        <iframe
          title={attachment.filename}
          src={attachmentUrl}
          className="mt-3 h-[680px] w-full border border-slate-200 bg-white"
        />
      );
    }

    if (previewKind === 'image') {
      return (
        <div className="mt-3 border border-slate-200 bg-white p-3">
          <img src={attachmentUrl} alt={attachment.filename} className="max-h-[680px] w-full object-contain" />
        </div>
      );
    }

    if (previewKind === 'video') {
      return (
        <video controls className="mt-3 max-h-[680px] w-full border border-slate-200 bg-black">
          <source src={attachmentUrl} type={attachment.mimetype || undefined} />
        </video>
      );
    }

    if (previewKind === 'powerpoint') {
      const isLocalHost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      if (isLocalHost) {
        return (
          <div className="mt-3 border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
            Este archivo PowerPoint no se puede previsualizar embebido desde `localhost`. Usa el boton de descarga para abrirlo.
          </div>
        );
      }

      return (
        <iframe
          title={attachment.filename}
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(attachmentUrl)}`}
          className="mt-3 h-[680px] w-full border border-slate-200 bg-white"
        />
      );
    }

    return (
      <p className="mt-3 text-sm text-slate-600">
        Vista previa no disponible para este archivo. Usa el boton de descarga.
      </p>
    );
  }

  function renderSectionDetail(section: AulaSection) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Tema del curso</p>
            <h4 className="mt-2 text-lg font-bold text-[#25364f]">{section.name}</h4>
            {section.summary ? <p className="mt-2 text-sm text-slate-700">{section.summary}</p> : null}
          </div>
          <button
            type="button"
            onClick={() => setSelectedSectionId(null)}
            className="inline-flex cursor-pointer border border-[#0f5ea8] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8] transition hover:bg-[#eef6ff]"
          >
            Volver al listado de temas
          </button>
        </div>

        {section.modules.length ? (
          <div className="space-y-4">
            {section.modules.map((module) => (
              <div key={module.id} className="border border-slate-200 bg-white px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">{module.type}</p>
                <p className="mt-1 text-base font-bold text-[#25364f]">{module.name}</p>
                {module.intro ? <p className="mt-2 text-sm leading-7 text-slate-700">{module.intro}</p> : null}
                {module.externalUrl ? (
                  <div className="mt-3">
                    <a
                      href={module.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex cursor-pointer border border-[#0f5ea8] bg-[#eef6ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
                    >
                      Abrir enlace externo
                    </a>
                  </div>
                ) : null}

                {module.attachments.length ? (
                  <div className="mt-4 space-y-4">
                    {module.attachments.map((attachment) => (
                      <div key={attachment.id} className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-[#25364f]">{attachment.filename}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                              {attachment.mimetype || 'Archivo'} / {Math.max(1, Math.round(attachment.filesize / 1024))} KB
                            </p>
                          </div>
                          <a
                            href={getAttachmentUrl(attachment)}
                            target="_blank"
                            rel="noreferrer"
                            download={attachment.filename}
                            className="inline-flex cursor-pointer border border-[#0f5ea8] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8] transition hover:bg-[#eef6ff]"
                          >
                            Descargar
                          </a>
                        </div>
                        {renderAttachmentPreview(attachment)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-600">Sin archivos recuperados en este elemento.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700">
            Sin contenido recuperado en este tema.
          </div>
        )}
      </div>
    );
  }

  function renderModuleTypeBlock(title: string, types: string[]) {
    if (!selectedCourseDetail) {
      return <p>Abre un curso para ver este contenido.</p>;
    }

    const filteredModules = selectedCourseModules.filter((module) => types.includes(module.type));

    if (!filteredModules.length) {
      return <p>No se encontraron elementos de {title.toLowerCase()} en este curso.</p>;
    }

    const renderModuleRow = (module: (typeof filteredModules)[number]) => (
      <div key={module.id} className="border border-slate-200 bg-white px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">{module.type}</p>
            <h5 className="mt-1 text-sm font-bold text-[#25364f]">{module.name}</h5>
          </div>
          <span className="text-xs text-slate-500">{module.sectionName}</span>
        </div>
        {module.intro ? <p className="mt-3 text-sm leading-7 text-slate-700">{module.intro}</p> : null}
        {module.externalUrl ? (
          <a
            href={module.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex cursor-pointer text-sm font-semibold text-[#0f5ea8] hover:underline"
          >
            Abrir enlace
          </a>
        ) : null}
        {module.attachments.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {module.attachments.map((attachment) => (
              <a
                key={attachment.id}
                href={`${AULA_SERVER_BASE}${attachment.url}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer border border-slate-300 bg-[#f8fbff] px-3 py-2 text-xs font-semibold text-[#25364f] transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
              >
                {attachment.filename}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    );

    if (title === 'Foros') {
      return (
        <div className="space-y-4">
          <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
            <p className="text-sm text-slate-700">
              Vista del foro del curso <strong>{selectedCourseDetail.fullname}</strong>.
            </p>
          </div>
          {filteredModules.map((module) => renderModuleRow(module))}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Ultimas noticias</p>
              <div className="mt-3 space-y-3">
                {newsItems.length ? (
                  newsItems.map((item) => (
                    <div key={item.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                      <p className="font-semibold text-[#25364f]">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatUnixDate(item.timemodified)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-700">Sin noticias publicadas en este foro.</p>
                )}
              </div>
            </div>
            <div className="border border-slate-200 bg-white px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Buscar foros</p>
              <form className="mt-3 space-y-3" onSubmit={handleForumSearch}>
                <input
                  className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
                  placeholder="Buscar mensajes"
                  value={forumQuery}
                  onChange={(event) => setForumQuery(event.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex cursor-pointer border border-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
                >
                  Buscar
                </button>
              </form>
              <div className="mt-4 space-y-3">
                {forumResults.length ? (
                  forumResults.map((result) => (
                    <div key={result.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                      <p className="font-semibold text-[#25364f]">{result.subject}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatUnixDate(result.modified)}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{result.message || 'Sin contenido visible.'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-700">
                    {forumQuery.trim() ? 'Sin resultados en los foros de este curso.' : 'Usa la busqueda del foro para revisar mensajes.'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {forumThreads.length ? (
              forumThreads.map((forum) => (
                <div key={forum.id} className="border border-slate-200 bg-white px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#25364f]">{forum.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{forum.discussionCount} discusiones recuperadas</p>
                    </div>
                  </div>
                  {forum.intro ? <p className="mt-3 text-sm leading-7 text-slate-700">{forum.intro}</p> : null}
                  <div className="mt-4 space-y-3">
                    {forum.discussions.length ? (
                      forum.discussions.map((discussion) => (
                        <div key={discussion.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                          <p className="font-semibold text-[#25364f]">{discussion.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {discussion.user?.fullname ?? 'Sin autor visible'} - {formatUnixDate(discussion.timemodified)}
                          </p>
                          <div className="mt-3 space-y-2">
                            {discussion.posts.length ? (
                              discussion.posts.slice(0, 5).map((post) => (
                                <div key={post.id} className="border border-slate-200 bg-white px-3 py-3">
                                  <p className="font-semibold text-[#25364f]">{post.subject || 'Sin asunto'}</p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {post.user?.fullname ?? 'Sin autor visible'} - {formatUnixDate(post.modified)}
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-slate-700">
                                    {post.message || 'Sin contenido visible.'}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-slate-700">Sin publicaciones visibles en esta discusión.</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-700">No se encontraron discusiones en este foro.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-700">No se encontraron foros con discusiones en este curso.</p>
            )}
          </div>
        </div>
      );
    }

    if (title === 'Cuestionarios') {
      return (
        <div className="space-y-4">
          <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
            <p className="text-sm text-slate-700">
              Vista del cuestionario del curso <strong>{selectedCourseDetail.fullname}</strong>.
            </p>
          </div>
          {filteredModules.map((module) => renderModuleRow(module))}
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Elementos calificables</p>
            <div className="mt-3 space-y-3">
              {gradeItems.length ? (
                gradeItems.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border border-slate-200 bg-[#f8fbff] px-3 py-3">
                    <div>
                      <p className="font-semibold text-[#25364f]">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                        {item.itemmodule || item.itemtype}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">Maximo: {item.grademax || 0}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-700">Sin items de calificacion registrados en este curso.</p>
              )}
            </div>
          </div>
          <div className="border border-slate-200 bg-white px-4 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">Intentos registrados</p>
            <div className="mt-3 space-y-3">
              {quizAttempts.length ? (
                quizAttempts.map((attempt) => (
                  <div key={attempt.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#25364f]">{attempt.quizName}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {attempt.user?.fullname ?? 'Sin usuario visible'} / Intento {attempt.attempt}
                        </p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>Estado: {attempt.state}</p>
                        <p>Preguntas: {attempt.questionCount}</p>
                        <p>Nota: {attempt.sumgrades ?? '-'}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Inicio: {formatUnixDate(attempt.timestart)}
                      {attempt.timefinish ? ` / Fin: ${formatUnixDate(attempt.timefinish)}` : ''}
                      {attempt.preview ? ' / Vista previa' : ''}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-700">No se encontraron intentos registrados en los cuestionarios de este curso.</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
          <p className="text-sm text-slate-700">
            Vista recuperada de <strong>{title}</strong> para <strong>{selectedCourseDetail.fullname}</strong>.
          </p>
        </div>
        {filteredModules.map((module) => renderModuleRow(module))}
      </div>
    );
  }

  function renderCourseContent(course: AulaCourseDetail) {
    const selectedSection = selectedSectionId
      ? course.sections.find((section) => section.id === selectedSectionId) ?? null
      : null;

    if (selectedSection) {
      return renderSectionDetail(selectedSection);
    }

    return (
      <div className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
            {course.category?.name ?? 'Sin categoria'}
          </p>
          <h4 className="mt-2 text-lg font-bold text-[#25364f]">{course.fullname}</h4>
          <p className="mt-2 text-sm text-slate-700">
            {course.summary?.trim() || 'Curso recuperado desde el respaldo.'}
          </p>
        </div>
        {course.sections.map((section) => (
          <div key={section.id} className="border border-slate-200 bg-[#f8fbff] px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h5 className="text-sm font-bold uppercase text-[#25364f]">{section.name}</h5>
                {section.summary ? (
                  <p className="mt-2 text-sm text-slate-700">{section.summary}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setSelectedSectionId(section.id)}
                className="inline-flex cursor-pointer border border-[#0f5ea8] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8] transition hover:bg-[#eef6ff]"
              >
                Ver tema detalladamente
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {section.modules.map((module) => (
                <div key={module.id} className="border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                    {module.type}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#25364f]">{module.name}</p>
                  {module.intro ? <p className="mt-2 text-sm text-slate-700">{module.intro}</p> : null}
                  {module.externalUrl ? (
                    <a
                      href={module.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex cursor-pointer text-sm font-semibold text-[#0f5ea8] hover:underline"
                    >
                      Abrir enlace
                    </a>
                  ) : null}
                  {module.attachments.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {module.attachments.map((attachment) => (
                        <a
                          key={attachment.id}
                          href={`${AULA_SERVER_BASE}${attachment.url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex cursor-pointer border border-slate-300 bg-[#f8fbff] px-3 py-2 text-xs font-semibold text-[#25364f] transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                        >
                          {attachment.filename}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-slate-500">
                      Sin archivos recuperados en este elemento.
                    </p>
                  )}
                </div>
              ))}
            </div>
            {!section.modules.length ? (
              <p className="mt-3 text-xs text-slate-500">
                Sin contenido recuperado en este topico.
              </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  function renderLegacyCourseSidebar() {
    const upcomingEvents = events.filter((item) => Number(item.timestart ?? 0) * 1000 >= Date.now());

    return (
      <div className="space-y-6">
        <LegacyBlock title="Buscar foros">
          <form className="space-y-3" onSubmit={handleForumSearch}>
            <input
              className="w-full border border-slate-300 px-3 py-2 text-sm text-slate-700"
              placeholder="Buscar en este curso"
              value={forumQuery}
              onChange={(event) => setForumQuery(event.target.value)}
            />
            <button
              type="submit"
              className="inline-flex cursor-pointer border border-[#0f5ea8] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
            >
              Buscar
            </button>
          </form>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            {forumResults.length ? (
              forumResults.map((result) => (
                <div key={result.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                  <p className="font-semibold text-[#25364f]">{result.subject}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatUnixDate(result.modified)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{result.message || 'Sin contenido visible.'}</p>
                </div>
              ))
            ) : (
              <p>{forumQuery.trim() ? 'Sin resultados en los foros de este curso.' : 'Ingresa un termino para buscar en los foros.'}</p>
            )}
          </div>
        </LegacyBlock>

        <LegacyBlock title="Ultimas noticias">
          {sidebarLoading ? (
            <p className="text-sm text-slate-700">Cargando novedades...</p>
          ) : newsItems.length ? (
            <div className="space-y-3 text-sm text-slate-700">
              {newsItems.map((item) => (
                <div key={item.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                  <p className="font-semibold text-[#25364f]">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatUnixDate(item.timemodified)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-700">Sin novedades registradas en este curso.</p>
          )}
        </LegacyBlock>

        <LegacyBlock title="Eventos proximos">
          {sidebarLoading ? (
            <p className="text-sm text-slate-700">Cargando eventos...</p>
          ) : upcomingEvents.length ? (
            <div className="space-y-3 text-sm text-slate-700">
              {upcomingEvents.map((item) => (
                <div key={item.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                  <p className="font-semibold text-[#25364f]">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatUnixDate(item.timestart)}</p>
                  {item.description ? <p className="mt-2 leading-6">{item.description}</p> : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-700">No hay eventos proximos en este curso.</p>
          )}
        </LegacyBlock>

        {user?.canCreateCourse ? (
          <LegacyBlock title="Actividad reciente">
            {sidebarLoading ? (
              <p className="text-sm text-slate-700">Cargando actividad...</p>
            ) : activityItems.length ? (
              <div className="space-y-3 text-sm text-slate-700">
                {activityItems.map((item) => (
                  <div key={item.id} className="border border-slate-200 bg-[#f8fbff] px-3 py-3">
                    <p className="font-semibold text-[#25364f]">
                      {item.user?.fullname ?? 'Sistema'} - {item.action}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                      {item.component} / {item.target}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{formatUnixDate(item.timecreated)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-700">Sin actividad reciente en este curso.</p>
            )}
          </LegacyBlock>
        ) : null}
      </div>
    );
  }

  function renderLegacyCourseTree() {
    if (!selectedCourseDetail) {
      return null;
    }

    return (
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Curso actual</p>
        <div className="border border-slate-200 bg-[#f8fbff] px-3 py-3 text-sm text-slate-700">
          <p className="font-bold text-[#25364f]">{selectedCourseDetail.fullname}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">{selectedCourseDetail.shortname}</p>
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          <button
            type="button"
            onClick={() => setActivePanel('Curso abierto')}
            className={`block w-full cursor-pointer border px-3 py-2 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff] ${activePanel === 'Curso abierto' ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#0f5ea8]' : 'border-slate-200 bg-white'}`}
          >
            Contenido del curso
          </button>
          {user?.canCreateCourse ? (
            <button
              type="button"
              onClick={() => setActivePanel('Participantes')}
              className={`block w-full cursor-pointer border px-3 py-2 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff] ${activePanel === 'Participantes' ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#0f5ea8]' : 'border-slate-200 bg-white'}`}
            >
              Participantes
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setActivePanel('Calificaciones')}
            className={`block w-full cursor-pointer border px-3 py-2 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff] ${activePanel === 'Calificaciones' ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#0f5ea8]' : 'border-slate-200 bg-white'}`}
          >
            Calificaciones
          </button>
          {selectedCoursePanels.map((panel) => (
            <button
              key={panel}
              type="button"
              onClick={() => setActivePanel(panel)}
              className={`block w-full cursor-pointer border px-3 py-2 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff] ${activePanel === panel ? 'border-[#0f5ea8] bg-[#eef6ff] text-[#0f5ea8]' : 'border-slate-200 bg-white'}`}
            >
              {panel}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-[#f7fafc] py-8">
        <div className="mx-auto max-w-[1880px] px-2 sm:px-3 xl:px-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#0f5ea8]">Campus</p>
          <h1 className="mt-2 text-2xl font-bold uppercase text-[#25364f] md:text-3xl">Aula Virtual</h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-[1880px] px-2 sm:px-3 xl:px-4">
          <div className="space-y-8">
            <div className="rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm">
              <h2 className="text-lg font-bold uppercase text-[#25364f]">Acceso</h2>

              {user ? (
                <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                  <div className="space-y-1.5">
                    <p>
                      <strong>Usuario:</strong> {user.fullname || `${user.firstname} ${user.lastname}`.trim()}
                    </p>
                    <p>
                      <strong>Cuenta:</strong> {user.username}
                    </p>
                    <p>
                      <strong>Correo:</strong> {user.email || 'No registrado'}
                    </p>
                    <p>
                      <strong>Panel:</strong> {user.canCreateCourse ? 'Administrador' : 'Usuario'}
                    </p>
                  </div>
                  <div className="md:pt-0.5">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex border border-[#0f5ea8] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
                    >
                      Cerrar sesion
                    </button>
                  </div>
                </div>
              ) : (
                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                  <input
                    className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700"
                    placeholder="Usuario o correo"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                  />
                  <input
                    type="password"
                    className="w-full border border-slate-300 px-4 py-3 text-sm text-slate-700"
                    placeholder="Contrasena"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {authError ? <p className="text-sm text-red-700">{authError}</p> : null}
                  <button
                    type="submit"
                    className="inline-flex bg-[#0f5ea8] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white"
                    disabled={authLoading}
                  >
                    {authLoading ? 'Ingresando...' : 'Iniciar sesion'}
                  </button>
                </form>
              )}

              {visibleUserCourses.length ? (
                <div className="mt-8 border-t border-slate-200 pt-8">
                  <h3 className="text-lg font-bold uppercase text-[#25364f]">Mis cursos</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {visibleUserCourses.map((course) => (
                      <button
                        type="button"
                        key={course.id}
                        onClick={() => openCourse(course.id)}
                        className="cursor-pointer border border-slate-200 bg-[#f8fbff] px-4 py-3 text-left text-sm text-slate-700 transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                      >
                        {course.fullname}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="min-w-0">
              {loading ? (
                <div className="rounded-sm border border-slate-200 bg-white px-8 py-10 text-sm text-slate-700 shadow-sm">
                  Cargando Aula Virtual...
                </div>
              ) : error ? (
                <div className="rounded-sm border border-red-200 bg-red-50 px-8 py-10 text-sm text-red-700 shadow-sm">
                  {error}
                </div>
              ) : (
                <>
                  {user?.canCreateCourse ? (
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Cursos</p>
                        <p className="mt-2 text-3xl font-bold text-[#25364f]">{summary?.courseCount ?? 0}</p>
                      </div>
                      <div className="rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Categorias</p>
                        <p className="mt-2 text-3xl font-bold text-[#25364f]">{summary?.categoryCount ?? 0}</p>
                      </div>
                      <div className="rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Usuarios</p>
                        <p className="mt-2 text-3xl font-bold text-[#25364f]">{summary?.activeUserCount ?? 0}</p>
                      </div>
                      <div className="rounded-sm border border-slate-200 bg-white px-6 py-5 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Matriculas</p>
                        <p className="mt-2 text-3xl font-bold text-[#25364f]">{summary?.enrolmentCount ?? 0}</p>
                      </div>
                    </div>
                  ) : null}

                  <div className={`${user?.canCreateCourse ? 'mt-8' : 'mt-0'} min-w-0 rounded-sm border border-slate-200 bg-white px-6 py-8 shadow-sm xl:px-8 xl:py-10`}>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold uppercase text-[#25364f]">
                        {user ? (user.canCreateCourse ? 'Panel de administracion' : 'Panel de usuario') : 'Cursos recuperados'}
                      </h2>
                      <a
                        href={`${AULA_API_BASE}/status`}
                        className="inline-flex border border-[#0f5ea8] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]"
                      >
                        Ver estado API
                      </a>
                    </div>

                    {user ? (
                      user.canCreateCourse ? (
                        <>
                          <div className="mt-8 grid gap-6 2xl:grid-cols-[220px_minmax(0,1fr)_220px]">
                            <div className="space-y-6">
                              <LegacyBlock title="Navegacion">
                                <LegacyLinkList items={adminNavigation} activeItem={activePanel} onSelect={setActivePanel} />
                              </LegacyBlock>
                              {selectedCourseDetail ? (
                                <LegacyBlock title="Navegacion del curso">
                                  {renderLegacyCourseTree()}
                                </LegacyBlock>
                              ) : null}
                              <LegacyBlock title="Administracion">
                                <LegacyLinkList items={adminManagementItems} activeItem={activePanel} onSelect={setActivePanel} />
                              </LegacyBlock>
                            </div>

                            <div className="min-w-0 space-y-6">
                              <LegacyBlock title="Administracion del sitio">
                                <div className="space-y-4 text-sm leading-7 text-slate-700">
                                  {activePanel === 'Categorias' ? (
                                    <div className="space-y-3">
                                      {categories.map((category) => (
                                        <div key={category.id} className="border border-slate-200 bg-[#f8fbff] px-4 py-3">
                                          {category.name}
                                        </div>
                                      ))}
                                    </div>
                                  ) : activePanel === 'Cursos' || activePanel === 'Gestionar cursos' ? (
                                    renderCourseManagementBlock()
                                  ) : activePanel === 'Usuarios' || activePanel === 'Asignar usuarios' ? (
                                    renderUsersManagementBlock()
                                  ) : activePanel === 'Matriculas' ? (
                                    renderEnrolmentsBlock()
                                  ) : activePanel === 'Usuarios matriculados' ? (
                                    renderEnrolledUsersBlock()
                                  ) : activePanel === 'Reportes' || activePanel === 'Reporte de actividad' ? (
                                    renderReportsBlock()
                                  ) : activePanel === 'Grupos' ? (
                                    renderGroupsManagementBlock()
                                  ) : activePanel === 'Permisos' ? (
                                    renderPermissionsManagementBlock()
                                  ) : activePanel === 'Comprobar permisos' ? (
                                    renderPermissionCheckBlock()
                                  ) : activePanel === 'Filtros' ? (
                                    renderCourseAdminUtilityBlock(
                                      'Filtros',
                                      'Gestion de filtros del curso.',
                                      ['Multimedia', 'Autoenlace de glosario', 'Contenido multimedia'],
                                    )
                                  ) : activePanel === 'Copia de respaldo' ? (
                                    renderBackupManagementBlock()
                                  ) : activePanel === 'Restaurar' ? (
                                    renderRestoreManagementBlock()
                                  ) : activePanel === 'Importar' ? (
                                    renderImportManagementBlock()
                                  ) : activePanel === 'Reiniciar' ? (
                                    renderResetManagementBlock()
                                  ) : activePanel === 'Archivos del curso' ? (
                                    renderModuleTypeBlock('Recursos', ['resource', 'folder'])
                                  ) : activePanel === 'Editar contenido del curso' ? (
                                    renderCourseContentEditorBlock()
                                  ) : activePanel === 'Configuracion del curso' ? (
                                    selectedCourseDetail ? (
                                      renderCourseSettingsBlock()
                                    ) : (
                                      <p>Abre un curso para ver su configuracion.</p>
                                    )
                                  ) : activePanel === 'Banco de preguntas' ? (
                                    renderQuestionBankBlock()
                                  ) : activePanel === 'Participantes' ? (
                                    renderParticipantsPanel()
                                  ) : activePanel === 'Calificaciones' ? (
                                    renderGradesBlock()
                                  ) : activePanel === 'Foros' ? (
                                    renderModuleTypeBlock('Foros', ['forum'])
                                  ) : activePanel === 'Cuestionarios' ? (
                                    renderModuleTypeBlock('Cuestionarios', ['quiz'])
                                  ) : activePanel === 'Chats' ? (
                                    renderModuleTypeBlock('Chats', ['chat'])
                                  ) : activePanel === 'Recursos' ? (
                                    renderModuleTypeBlock('Recursos', ['resource', 'folder'])
                                  ) : activePanel === 'URLs' ? (
                                    renderModuleTypeBlock('URLs', ['url'])
                                  ) : activePanel === 'Tareas' ? (
                                    renderModuleTypeBlock('Tareas', ['assign'])
                                  ) : activePanel === 'Administracion del curso' ? (
                                    selectedCourseDetail ? (
                                      <div className="space-y-3">
                                        <div className="border border-slate-200 bg-[#f8fbff] px-4 py-3">
                                          <p><strong>Curso:</strong> {selectedCourseDetail.fullname}</p>
                                          <p><strong>Clave:</strong> {selectedCourseDetail.shortname}</p>
                                          <p><strong>Formato:</strong> {selectedCourseDetail.format}</p>
                                          <p><strong>Categoria:</strong> {selectedCourseDetail.category?.name ?? 'Sin categoria'}</p>
                                          <p><strong>Matriculas:</strong> {selectedCourseDetail.enrolments}</p>
                                        </div>
                                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                                          {[
                                            'Editar contenido del curso',
                                            'Usuarios matriculados',
                                            'Grupos',
                                            'Permisos',
                                            'Comprobar permisos',
                                            'Filtros',
                                            'Informes',
                                            'Copia de respaldo',
                                            'Restaurar',
                                            'Importar',
                                            'Reiniciar',
                                            ...(questionBankItems.length ? ['Banco de preguntas'] : []),
                                            'Archivos del curso',
                                          ].map((item) => (
                                            <button
                                              key={item}
                                              type="button"
                                              onClick={() => setActivePanel(item === 'Informes' ? 'Reportes' : item)}
                                              className="cursor-pointer border border-slate-200 bg-[#f8fbff] px-4 py-3 text-left text-sm text-slate-700 transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                                            >
                                              {item}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      <p>Abre un curso para ver su administracion.</p>
                                    )
                                  ) : activePanel === 'Curso abierto' && selectedCourseDetail ? (
                                    renderCourseContent(selectedCourseDetail)
                                  ) : (
                                    <>
                                      <p>
                                        Vista principal recuperada del aula. Aqui se concentran los cursos, usuarios,
                                        categorias y modulos activos detectados en el respaldo.
                                      </p>
                                      <div className="grid gap-4 lg:grid-cols-2">
                                        {manageableCourses.map((course) => (
                                          <button
                                            type="button"
                                            key={course.id}
                                            onClick={() => openCourse(course.id)}
                                            className="min-w-0 cursor-pointer border border-slate-200 bg-[#f8fbff] px-4 py-4 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                                          >
                                            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                                              {course.category?.name ?? 'Sin categoria'}
                                            </p>
                                            <h4 className="mt-2 break-words text-sm font-bold text-[#25364f]">
                                              {course.fullname}
                                            </h4>
                                            <p className="mt-1 text-xs uppercase tracking-[0.06em] text-slate-500">
                                              {course.shortname} - {course.enrolments} matriculas
                                            </p>
                                          </button>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </LegacyBlock>

                              <LegacyBlock title="Categorias del aula">
                                <div className="space-y-3 text-sm text-slate-700">
                                  {categories.slice(0, 12).map((category) => (
                                    <div key={category.id} className="border border-slate-200 bg-[#f8fbff] px-4 py-3">
                                      {category.name}
                                    </div>
                                  ))}
                                </div>
                              </LegacyBlock>
                            </div>

                            {selectedCourseDetail ? (
                              renderLegacyCourseSidebar()
                            ) : (
                              <div className="space-y-6">
                                <LegacyBlock title="Calendario">
                                  <MiniCalendar />
                                </LegacyBlock>
                                <LegacyBlock title="Modulos activos">
                                  <LegacyLinkList items={summary?.moduleTypes.slice(0, 10) ?? []} />
                                </LegacyBlock>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                          <div className="mt-8 grid gap-6 2xl:grid-cols-[220px_minmax(0,1fr)_220px]">
                            <div className="space-y-6">
                              {selectedCourseDetail ? (
                                <LegacyBlock title="Navegacion del curso">
                                  {renderLegacyCourseTree()}
                                </LegacyBlock>
                              ) : null}
                              <LegacyBlock title="Mi perfil">
                                <div className="space-y-2 text-sm text-slate-700">
                                  <p>
                                    <strong>Nombre:</strong> {user.fullname || user.username}
                                  </p>
                                  <p>
                                    <strong>Usuario:</strong> {user.username}
                                  </p>
                                  <p>
                                    <strong>Cursos:</strong> {visibleUserCourses.length}
                                  </p>
                                </div>
                              </LegacyBlock>
                            </div>

                          <div className="min-w-0 space-y-6">
                            <LegacyBlock title="Vista general de cursos">
                              {detailLoading ? (
                                <p className="text-sm leading-7 text-slate-700">Abriendo curso...</p>
                              ) : activePanel === 'Curso abierto' && selectedCourseDetail ? (
                                renderCourseContent(selectedCourseDetail)
                              ) : activePanel === 'Participantes' ? (
                                renderParticipantsPanel()
                              ) : activePanel === 'Perfil' ? (
                                <div className="space-y-3 border border-slate-200 bg-[#f8fbff] px-4 py-4">
                                  <p><strong>Nombre:</strong> {user.fullname || user.username}</p>
                                  <p><strong>Usuario:</strong> {user.username}</p>
                                  <p><strong>Correo:</strong> {user.email || 'No registrado'}</p>
                                  <p><strong>ID:</strong> {user.idnumber || 'No registrado'}</p>
                                  <p><strong>Telefono:</strong> {user.phone1 || user.phone2 || 'No registrado'}</p>
                                  <p><strong>Direccion:</strong> {user.address || 'No registrada'}</p>
                                  <p><strong>Institucion:</strong> {user.institution || 'No registrada'}</p>
                                  <p><strong>Departamento:</strong> {user.department || 'No registrado'}</p>
                                  <p><strong>Pais:</strong> {user.country || 'No registrado'}</p>
                                  <p><strong>Ciudad:</strong> {user.city || 'No registrada'}</p>
                                  <p><strong>Idioma:</strong> {user.lang || 'No registrado'}</p>
                                  <p><strong>Zona horaria:</strong> {user.timezone || 'No registrada'}</p>
                                  <p><strong>Ultima IP:</strong> {user.lastip || 'No registrada'}</p>
                                  <p><strong>Primer acceso:</strong> {formatLastAccess(user.firstaccess)}</p>
                                  <p><strong>Cursos matriculados:</strong> {visibleUserCourses.length}</p>
                                  <p><strong>Ultimo acceso:</strong> {formatLastAccess(user.lastaccess)}</p>
                                  <p><strong>Ultimo login:</strong> {formatLastAccess(user.lastlogin)}</p>
                                  <p><strong>Login actual:</strong> {formatLastAccess(user.currentlogin)}</p>
                                  <p><strong>Autenticacion:</strong> {user.auth || 'manual'}</p>
                                  <p><strong>Confirmado:</strong> {user.confirmed ? 'Si' : 'No'}</p>
                                  <p><strong>Suspendido:</strong> {user.suspended ? 'Si' : 'No'}</p>
                                  {user.description ? <p><strong>Descripcion:</strong> {user.description}</p> : null}
                                  {user.preferences?.length ? (
                                    <div className="pt-2">
                                      <p><strong>Preferencias:</strong></p>
                                      <div className="space-y-1">
                                        {user.preferences.slice(0, 12).map((preference) => (
                                          <p key={`${user.id}-pref-${preference.id}`}>
                                            <strong>{formatAulaPreferenceName(preference.name)}:</strong>{' '}
                                            {formatAulaPreferenceValue(preference.value)}
                                          </p>
                                        ))}
                                        {user.preferences.length > 12 ? (
                                          <p className="text-xs text-slate-500">
                                            Y {user.preferences.length - 12} preferencias mas registradas.
                                          </p>
                                        ) : null}
                                      </div>
                                    </div>
                                  ) : null}
                                  {user.courseLastAccess?.length ? (
                                    <div className="pt-2">
                                      <p><strong>Accesos por curso:</strong></p>
                                      <div className="space-y-1">
                                        {user.courseLastAccess
                                          .slice()
                                          .sort((left, right) => right.timeaccess - left.timeaccess)
                                          .slice(0, 10)
                                          .map((access) => (
                                            <p key={`${user.id}-course-access-${access.id}`}>
                                              <strong>{resolveCourseName(access.courseid)}:</strong>{' '}
                                              {formatRelativeAccess(access.timeaccess)} ({formatLastAccess(access.timeaccess)})
                                            </p>
                                          ))}
                                        {user.courseLastAccess.length > 10 ? (
                                          <p className="text-xs text-slate-500">
                                            Y {user.courseLastAccess.length - 10} accesos mas registrados.
                                          </p>
                                        ) : null}
                                      </div>
                                    </div>
                                  ) : null}
                                  {user.customFields?.length ? (
                                    <div className="pt-2">
                                      <p><strong>Campos personalizados:</strong></p>
                                      {user.customFields.map((field) => (
                                        <p key={`${user.id}-${field.fieldid}`}>
                                          <strong>{field.name || field.shortname}:</strong> {field.data || 'Sin dato'}
                                        </p>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              ) : activePanel === 'Calificaciones' ? (
                                renderGradesBlock()
                              ) : activePanel === 'Foros' ? (
                                renderModuleTypeBlock('Foros', ['forum'])
                              ) : activePanel === 'Cuestionarios' ? (
                                renderModuleTypeBlock('Cuestionarios', ['quiz'])
                              ) : activePanel === 'Chats' ? (
                                renderModuleTypeBlock('Chats', ['chat'])
                              ) : activePanel === 'Recursos' ? (
                                renderModuleTypeBlock('Recursos', ['resource', 'folder'])
                              ) : activePanel === 'URLs' ? (
                                renderModuleTypeBlock('URLs', ['url'])
                              ) : activePanel === 'Tareas' ? (
                                renderModuleTypeBlock('Tareas', ['assign'])
                              ) : activePanel === 'Catalogo' || activePanel === 'Panel principal' || activePanel === 'Mis cursos' ? (
                                visibleUserCourses.length ? (
                                <div className="grid gap-4 lg:grid-cols-2">
                                  {visibleUserCourses.map((course) => (
                                    <button
                                      type="button"
                                      key={course.id}
                                      onClick={() => openCourse(course.id)}
                                      className="min-w-0 cursor-pointer border border-slate-200 bg-[#f8fbff] px-4 py-4 text-left transition hover:border-[#0f5ea8] hover:bg-[#eef6ff]"
                                    >
                                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                                        {course.category?.name ?? 'Sin categoria'}
                                      </p>
                                      <h4 className="mt-2 break-words text-sm font-bold text-[#25364f]">{course.fullname}</h4>
                                      <p className="mt-2 text-xs uppercase tracking-[0.06em] text-slate-500">
                                        {course.shortname}
                                      </p>
                                      <p className="mt-3 text-sm leading-7 text-slate-700">
                                        {course.summary?.trim() || 'Curso recuperado desde el respaldo del Aula Virtual.'}
                                      </p>
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm leading-7 text-slate-700">
                                  Tu cuenta no registra cursos matriculados en el respaldo recuperado.
                                </p>
                              )) : (
                                <p className="text-sm leading-7 text-slate-700">
                                  Selecciona una opcion del panel lateral para cambiar de vista.
                                </p>
                              )}
                            </LegacyBlock>

                          </div>

                          {selectedCourseDetail ? (
                            renderLegacyCourseSidebar()
                          ) : (
                            <div className="space-y-6">
                              <LegacyBlock title="Calendario">
                                <MiniCalendar />
                              </LegacyBlock>
                              <LegacyBlock title="Resumen del alumno">
                                <div className="space-y-2 text-sm text-slate-700">
                                  <p>Cursos matriculados: {visibleUserCourses.length}</p>
                                  <p>Ultimo acceso: {formatLastAccess(user.lastaccess)}</p>
                                  <p>Usuario: {user.username}</p>
                                </div>
                              </LegacyBlock>
                            </div>
                          )}
                        </div>
                      )
                    ) : (
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        {courses.map((course) => (
                          <article
                            key={course.id}
                            className="rounded-sm border border-slate-200 bg-[#f8fbff] px-6 py-6 shadow-sm"
                          >
                            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#0f5ea8]">
                              {course.category?.name ?? 'Sin categoria'}
                            </p>
                            <h3 className="mt-3 text-lg font-bold text-[#25364f]">{course.fullname}</h3>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">
                              {course.shortname}
                            </p>
                            <p className="mt-4 text-sm leading-7 text-slate-700">
                              {course.summary?.trim() || 'Curso recuperado desde el respaldo del Aula Virtual.'}
                            </p>
                            <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">
                              <span>{course.format}</span>
                              <span>{course.enrolments} matriculas</span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
