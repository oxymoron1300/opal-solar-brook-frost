import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bg3fLLwA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Ocorreu um erro inesperado. Tente recarregar a página.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg font-semibold",
				children: "Algo correu mal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function BasketballMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		"aria-hidden": "true",
		className: cn("text-primary", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16",
				r: "13.5",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 2.5c0 0-3.2 6.2-3.2 13.5S16 29.5 16 29.5",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 2.5c0 0 3.2 6.2 3.2 13.5S16 29.5 16 29.5",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M3.2 16h25.6",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.2 8.2c5 3.2 14.6 3.2 19.6 0",
				stroke: "currentColor",
				strokeWidth: "1.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.2 23.8c5-3.2 14.6-3.2 19.6 0",
				stroke: "currentColor",
				strokeWidth: "1.6"
			})
		]
	});
}
var PERIODS = [
	{
		key: "q1",
		label: "1.º",
		full: "1.º período"
	},
	{
		key: "q2",
		label: "2.º",
		full: "2.º período"
	},
	{
		key: "q3",
		label: "3.º",
		full: "3.º período"
	},
	{
		key: "q4",
		label: "4.º",
		full: "4.º período"
	},
	{
		key: "ot",
		label: "PR",
		full: "Prolongamento"
	}
];
var EMPTY_PERIOD = {
	minutes: 0,
	fgm2: 0,
	fga2: 0,
	fgm3: 0,
	fga3: 0,
	ftm: 0,
	fta: 0,
	oreb: 0,
	dreb: 0,
	ast: 0,
	stl: 0,
	blk: 0,
	tov: 0,
	pf: 0,
	plusMinus: 0
};
var STAT_DEFS = [
	{
		key: "minutes",
		label: "Minutos jogados",
		abbr: "MIN",
		step: .5,
		min: 0,
		max: 15
	},
	{
		key: "fgm2",
		label: "Lançamentos de 2 pontos convertidos",
		abbr: "2P",
		step: 1,
		min: 0
	},
	{
		key: "fga2",
		label: "Lançamentos de 2 pontos tentados",
		abbr: "2PA",
		step: 1,
		min: 0
	},
	{
		key: "fgm3",
		label: "Lançamentos de 3 pontos convertidos",
		abbr: "3P",
		step: 1,
		min: 0
	},
	{
		key: "fga3",
		label: "Lançamentos de 3 pontos tentados",
		abbr: "3PA",
		step: 1,
		min: 0
	},
	{
		key: "ftm",
		label: "Lançamentos livres convertidos",
		abbr: "LL",
		step: 1,
		min: 0
	},
	{
		key: "fta",
		label: "Lançamentos livres tentados",
		abbr: "LLA",
		step: 1,
		min: 0
	},
	{
		key: "oreb",
		label: "Ressaltos ofensivos",
		abbr: "RO",
		step: 1,
		min: 0
	},
	{
		key: "dreb",
		label: "Ressaltos defensivos",
		abbr: "RD",
		step: 1,
		min: 0
	},
	{
		key: "ast",
		label: "Assistências",
		abbr: "AST",
		step: 1,
		min: 0
	},
	{
		key: "stl",
		label: "Roubos de bola",
		abbr: "RB",
		step: 1,
		min: 0
	},
	{
		key: "blk",
		label: "Lançamentos bloqueados",
		abbr: "BL",
		step: 1,
		min: 0
	},
	{
		key: "tov",
		label: "Perdas de bola",
		abbr: "PER",
		step: 1,
		min: 0
	},
	{
		key: "pf",
		label: "Faltas pessoais",
		abbr: "FP",
		step: 1,
		min: 0,
		max: 6
	},
	{
		key: "plusMinus",
		label: "Mais / menos",
		abbr: "+/−",
		step: 1
	}
];
var POSITIONS = [
	"Base",
	"Extremo-armador",
	"Extremo",
	"Ala-poste",
	"Poste"
];
var ROLES = [{
	value: "titular",
	label: "Titular"
}, {
	value: "suplente",
	label: "Suplente"
}];
function emptyPeriods() {
	return {
		q1: { ...EMPTY_PERIOD },
		q2: { ...EMPTY_PERIOD },
		q3: { ...EMPTY_PERIOD },
		q4: { ...EMPTY_PERIOD },
		ot: { ...EMPTY_PERIOD }
	};
}
function newGameId() {
	return crypto.randomUUID();
}
function createEmptyGame(partial = {}) {
	const now = Date.now();
	const today = /* @__PURE__ */ new Date();
	const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	return {
		id: newGameId(),
		competition: partial.competition ?? "",
		date: partial.date ?? iso,
		location: partial.location ?? "",
		team: partial.team ?? "",
		opponent: partial.opponent ?? "",
		result: partial.result ?? "",
		athlete: partial.athlete ?? "BamBam",
		number: partial.number ?? "00",
		position: partial.position ?? "",
		role: partial.role ?? "",
		notes: partial.notes ?? "",
		periods: emptyPeriods(),
		createdAt: now,
		updatedAt: now
	};
}
function derivePeriod(p) {
	return {
		fgm: p.fgm2 + p.fgm3,
		fga: p.fga2 + p.fga3,
		reb: p.oreb + p.dreb,
		pts: p.fgm2 * 2 + p.fgm3 * 3 + p.ftm
	};
}
function sumPeriods(periods) {
	const acc = {
		...EMPTY_PERIOD,
		pts: 0,
		fgm: 0,
		fga: 0,
		reb: 0
	};
	for (const { key } of PERIODS) {
		const p = periods[key];
		for (const def of STAT_DEFS) acc[def.key] += p[def.key];
	}
	const d = derivePeriod(acc);
	acc.fgm = d.fgm;
	acc.fga = d.fga;
	acc.reb = d.reb;
	acc.pts = d.pts;
	return acc;
}
function computeIndicators(t) {
	const pct = (made, att) => att > 0 ? made / att * 100 : null;
	const missedFg = t.fga - t.fgm;
	const missedFt = t.fta - t.ftm;
	const pir = t.pts + t.reb + t.ast + t.stl + t.blk - missedFg - missedFt - t.tov - t.pf;
	return {
		fgPct: pct(t.fgm, t.fga),
		p2Pct: pct(t.fgm2, t.fga2),
		p3Pct: pct(t.fgm3, t.fga3),
		ftPct: pct(t.ftm, t.fta),
		ptsPerMin: t.minutes > 0 ? t.pts / t.minutes : null,
		astTo: t.tov > 0 ? t.ast / t.tov : t.ast > 0 ? Number.POSITIVE_INFINITY : null,
		pir
	};
}
function applyStat(period, key, value) {
	const next = { ...period };
	let v = value;
	const def = STAT_DEFS.find((d) => d.key === key);
	if (def?.min !== void 0) v = Math.max(def.min, v);
	if (def?.max !== void 0) v = Math.min(def.max, v);
	if (key === "minutes") v = Math.round(v * 2) / 2;
	else if (key !== "plusMinus") v = Math.round(v);
	else v = Math.round(v);
	next[key] = v;
	if (key === "fgm2" && next.fga2 < next.fgm2) next.fga2 = next.fgm2;
	if (key === "fgm3" && next.fga3 < next.fgm3) next.fga3 = next.fgm3;
	if (key === "ftm" && next.fta < next.ftm) next.fta = next.ftm;
	if (key === "fga2" && next.fga2 < next.fgm2) next.fgm2 = next.fga2;
	if (key === "fga3" && next.fga3 < next.fgm3) next.fgm3 = next.fga3;
	if (key === "fta" && next.fta < next.ftm) next.ftm = next.fta;
	return next;
}
function applyShot(period, kind, made, reverse = false) {
	const next = { ...period };
	const delta = reverse ? -1 : 1;
	if (kind === "2") {
		next.fga2 = Math.max(0, next.fga2 + delta);
		if (made) next.fgm2 = Math.max(0, next.fgm2 + delta);
		if (next.fgm2 > next.fga2) next.fgm2 = next.fga2;
	} else if (kind === "3") {
		next.fga3 = Math.max(0, next.fga3 + delta);
		if (made) next.fgm3 = Math.max(0, next.fgm3 + delta);
		if (next.fgm3 > next.fga3) next.fgm3 = next.fga3;
	} else {
		next.fta = Math.max(0, next.fta + delta);
		if (made) next.ftm = Math.max(0, next.ftm + delta);
		if (next.ftm > next.fta) next.ftm = next.fta;
	}
	return next;
}
function formatPct(value) {
	if (value === null) return "—";
	return `${value.toLocaleString("pt-PT", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	})}%`;
}
function formatRatio(value) {
	if (value === null) return "—";
	if (!Number.isFinite(value)) return "∞";
	return value.toLocaleString("pt-PT", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
function formatNum(value, digits = 0) {
	return value.toLocaleString("pt-PT", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function formatMinutes(value) {
	return formatNum(value, 1);
}
function formatPlusMinus(value) {
	if (value > 0) return `+${value}`;
	return String(value);
}
function formatDatePt(iso) {
	if (!iso) return "Sem data";
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return new Date(y, m - 1, d).toLocaleDateString("pt-PT", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function resultKind(result) {
	const m = result.replace(/[–—]/g, "-").trim().match(/^(\d+)\s*-\s*(\d+)$/);
	if (!m) return "unknown";
	const a = Number(m[1]);
	const b = Number(m[2]);
	if (a === b) return "unknown";
	return a > b ? "win" : "loss";
}
function p(partial) {
	return {
		...EMPTY_PERIOD,
		...partial
	};
}
var DEMO_GAMES = [
	{
		id: "demo-leoes",
		competition: "Campeonato regional — jornada 4",
		date: "2026-09-20",
		location: "Pavilhão Municipal",
		team: "Basquete BamBam",
		opponent: "Leões",
		result: "78-64",
		athlete: "BamBam",
		number: "00",
		position: "Extremo",
		role: "titular",
		notes: "Bom ritmo no 3.º período. Defesa no lado fraco.",
		createdAt: Date.parse("2026-09-20T21:00:00"),
		updatedAt: Date.parse("2026-09-20T21:00:00"),
		periods: {
			...emptyPeriods(),
			q1: p({
				minutes: 8,
				fgm2: 2,
				fga2: 4,
				fgm3: 1,
				fga3: 2,
				ftm: 0,
				fta: 0,
				oreb: 1,
				dreb: 2,
				ast: 1,
				stl: 1,
				tov: 1,
				pf: 1,
				plusMinus: 6
			}),
			q2: p({
				minutes: 6.5,
				fgm2: 1,
				fga2: 3,
				fgm3: 0,
				fga3: 2,
				ftm: 2,
				fta: 2,
				oreb: 0,
				dreb: 1,
				ast: 1,
				stl: 0,
				tov: 0,
				pf: 1,
				plusMinus: 2
			}),
			q3: p({
				minutes: 7.5,
				fgm2: 3,
				fga2: 4,
				fgm3: 1,
				fga3: 1,
				ftm: 1,
				fta: 2,
				oreb: 2,
				dreb: 2,
				ast: 2,
				stl: 1,
				blk: 1,
				tov: 1,
				pf: 0,
				plusMinus: 8
			}),
			q4: p({
				minutes: 4,
				fgm2: 0,
				fga2: 1,
				fgm3: 0,
				fga3: 1,
				ftm: 2,
				fta: 2,
				dreb: 1,
				ast: 1,
				stl: 0,
				tov: 0,
				pf: 1,
				plusMinus: 4
			})
		}
	},
	{
		id: "demo-aguias",
		competition: "Campeonato regional — jornada 3",
		date: "2026-09-13",
		location: "Pavilhão das Águias",
		team: "Basquete BamBam",
		opponent: "Águias",
		result: "61-69",
		athlete: "BamBam",
		number: "00",
		position: "Extremo",
		role: "titular",
		notes: "Noite fria no perímetro. Reagir melhor aos bloqueios indirectos.",
		createdAt: Date.parse("2026-09-13T21:00:00"),
		updatedAt: Date.parse("2026-09-13T21:00:00"),
		periods: {
			...emptyPeriods(),
			q1: p({
				minutes: 7,
				fgm2: 1,
				fga2: 3,
				fgm3: 0,
				fga3: 2,
				ftm: 1,
				fta: 2,
				oreb: 0,
				dreb: 1,
				ast: 0,
				stl: 1,
				tov: 2,
				pf: 1,
				plusMinus: -4
			}),
			q2: p({
				minutes: 5,
				fgm2: 2,
				fga2: 3,
				fgm3: 0,
				fga3: 1,
				dreb: 2,
				ast: 1,
				tov: 1,
				pf: 2,
				plusMinus: -2
			}),
			q3: p({
				minutes: 4,
				fgm2: 0,
				fga2: 2,
				fgm3: 1,
				fga3: 3,
				ftm: 0,
				fta: 0,
				dreb: 1,
				ast: 1,
				stl: 0,
				tov: 1,
				pf: 1,
				plusMinus: -6
			}),
			q4: p({
				minutes: 3.5,
				fgm2: 1,
				fga2: 2,
				fgm3: 0,
				fga3: 1,
				ftm: 2,
				fta: 2,
				oreb: 1,
				dreb: 0,
				ast: 0,
				tov: 0,
				pf: 0,
				plusMinus: 0
			})
		}
	},
	{
		id: "demo-dragoes",
		competition: "Taça — oitavos",
		date: "2026-09-06",
		location: "Pavilhão do Clube",
		team: "Basquete BamBam",
		opponent: "Dragões",
		result: "84-79",
		athlete: "BamBam",
		number: "00",
		position: "Extremo",
		role: "titular",
		notes: "Decisão no último minuto. Dois lances livres convertidos.",
		createdAt: Date.parse("2026-09-06T18:30:00"),
		updatedAt: Date.parse("2026-09-06T18:30:00"),
		periods: {
			...emptyPeriods(),
			q1: p({
				minutes: 8,
				fgm2: 3,
				fga2: 5,
				fgm3: 1,
				fga3: 2,
				oreb: 1,
				dreb: 2,
				ast: 2,
				stl: 1,
				blk: 0,
				tov: 1,
				pf: 0,
				plusMinus: 5
			}),
			q2: p({
				minutes: 7,
				fgm2: 2,
				fga2: 3,
				fgm3: 0,
				fga3: 2,
				ftm: 1,
				fta: 2,
				oreb: 0,
				dreb: 3,
				ast: 1,
				stl: 0,
				blk: 1,
				tov: 0,
				pf: 1,
				plusMinus: 3
			}),
			q3: p({
				minutes: 6,
				fgm2: 1,
				fga2: 2,
				fgm3: 2,
				fga3: 3,
				ftm: 0,
				fta: 0,
				oreb: 1,
				dreb: 1,
				ast: 1,
				stl: 1,
				tov: 1,
				pf: 2,
				plusMinus: -2
			}),
			q4: p({
				minutes: 7.5,
				fgm2: 2,
				fga2: 4,
				fgm3: 0,
				fga3: 1,
				ftm: 4,
				fta: 4,
				oreb: 1,
				dreb: 2,
				ast: 1,
				stl: 1,
				blk: 1,
				tov: 1,
				pf: 1,
				plusMinus: 4
			})
		}
	}
];
function touch(game, periods) {
	return {
		...game,
		periods: periods ?? game.periods,
		updatedAt: Date.now()
	};
}
var useGameStore = create()(persist((set, get) => ({
	games: DEMO_GAMES,
	loadDemo: () => set({ games: DEMO_GAMES.map((g) => ({ ...g })) }),
	createGame: (partial) => {
		const game = createEmptyGame(partial);
		set({ games: [game, ...get().games] });
		return game;
	},
	updateMeta: (id, patch) => set({ games: get().games.map((g) => g.id === id ? touch({
		...g,
		...patch
	}) : g) }),
	setPeriodStat: (id, period, key, value) => set({ games: get().games.map((g) => {
		if (g.id !== id) return g;
		const nextPeriod = applyStat(g.periods[period], key, value);
		return touch(g, {
			...g.periods,
			[period]: nextPeriod
		});
	}) }),
	addShot: (id, period, kind, made, reverse = false) => set({ games: get().games.map((g) => {
		if (g.id !== id) return g;
		const nextPeriod = applyShot(g.periods[period], kind, made, reverse);
		return touch(g, {
			...g.periods,
			[period]: nextPeriod
		});
	}) }),
	replacePeriod: (id, period, stats) => set({ games: get().games.map((g) => g.id === id ? touch(g, {
		...g.periods,
		[period]: stats
	}) : g) }),
	deleteGame: (id) => set({ games: get().games.filter((g) => g.id !== id) }),
	duplicateMeta: (id) => {
		const source = get().games.find((g) => g.id === id);
		if (!source) return null;
		const game = createEmptyGame({
			competition: source.competition,
			location: source.location,
			team: source.team,
			athlete: source.athlete,
			number: source.number,
			position: source.position,
			role: source.role
		});
		set({ games: [game, ...get().games] });
		return game;
	}
}), {
	name: "bambam-game-logs",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (state) => ({ games: state.games })
}));
function rehydrateGames() {
	Promise.resolve(useGameStore.persist.rehydrate());
}
function AppShell({ children }) {
	(0, import_react.useEffect)(() => {
		rehydrateGames();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 text-fg no-underline",
					"aria-label": "BamBam — início",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-paper shadow-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BasketballMark, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold tracking-tight",
							children: "BamBam"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 hidden text-xs font-medium uppercase tracking-widest text-muted sm:block",
							children: "Registo de jogo"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-xs text-muted md:block",
					children: "15 estatísticas · totais automáticos"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
			children
		})]
	});
}
var styles_default = "/assets/styles-S6pVnmQ9.css";
var APP_NAME = "BamBam";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Registo individual de jogo de basquetebol — 15 estatísticas por período, totais e indicadores automáticos."
			},
			{
				name: "theme-color",
				content: "#F3E9D7"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh overflow-x-hidden bg-bg font-sans text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$1 = () => import("./routes-DwwjgdIZ.mjs");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./jogo._id-CSqz7Kwq.mjs");
var Route = createFileRoute("/jogo/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	JogoIdRoute: Route.update({
		id: "/jogo/$id",
		path: "/jogo/$id",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { sumPeriods as _, POSITIONS as a, computeIndicators as c, formatMinutes as d, formatNum as f, resultKind as g, formatRatio as h, PERIODS as i, derivePeriod as l, formatPlusMinus as m, Route as n, ROLES as o, formatPct as p, useGameStore as r, STAT_DEFS as s, router_exports as t, formatDatePt as u, cn as v };
