import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Copy, i as Minus, n as Trash2, o as ArrowLeft, r as Plus } from "../_libs/lucide-react.mjs";
import { _ as sumPeriods, a as POSITIONS, c as computeIndicators, d as formatMinutes, f as formatNum, h as formatRatio, i as PERIODS, l as derivePeriod, m as formatPlusMinus, n as Route, o as ROLES, p as formatPct, r as useGameStore, s as STAT_DEFS, u as formatDatePt, v as cn } from "./router-Bg3fLLwA.mjs";
import { t as Button } from "./button-CkTIL_fI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jogo._id-CSqz7Kwq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border-0 bg-cell px-3 text-base text-fg shadow-border transition-[box-shadow] duration-150 placeholder:text-subtle file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-lg border-0 bg-cell px-3 py-2.5 text-base text-fg shadow-border transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted uppercase", className),
	...props
}));
Label.displayName = "Label";
var fieldClass = "flex h-11 w-full rounded-md border-0 bg-cell px-3 text-base text-fg shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 md:text-sm";
function GameMetaForm({ game, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-paper p-4 shadow-border sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Ficha do jogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Preencha os campos em creme. Os totais e indicadores actualizam-se sozinhos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Competição / jogo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.competition,
							onChange: (e) => onChange({ competition: e.target.value }),
							placeholder: "Campeonato, jornada…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Data",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: game.date,
							onChange: (e) => onChange({ date: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Local",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.location,
							onChange: (e) => onChange({ location: e.target.value }),
							placeholder: "Pavilhão"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Equipa",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.team,
							onChange: (e) => onChange({ team: e.target.value }),
							placeholder: "A sua equipa"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Adversário",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.opponent,
							onChange: (e) => onChange({ opponent: e.target.value }),
							placeholder: "Adversário"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Resultado",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.result,
							onChange: (e) => onChange({ result: e.target.value }),
							placeholder: "78-64"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Atleta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.athlete,
							onChange: (e) => onChange({ athlete: e.target.value }),
							placeholder: "Nome"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "N.º",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: game.number,
							onChange: (e) => onChange({ number: e.target.value }),
							placeholder: "00",
							inputMode: "numeric"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Posição",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: fieldClass,
							value: game.position,
							onChange: (e) => onChange({ position: e.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Seleccionar"
							}), POSITIONS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p,
								children: p
							}, p))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Titular / suplente",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: fieldClass,
							value: game.role,
							onChange: (e) => onChange({ role: e.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Seleccionar"
							}), ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: r.value,
								children: r.label
							}, r.value))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Observações",
						className: "sm:col-span-2 lg:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: game.notes,
							onChange: (e) => onChange({ notes: e.target.value }),
							placeholder: "Notas tácticas, ritmo, pontos a melhorar…",
							rows: 3
						})
					})
				]
			})
		]
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var ITEMS = [
	{
		key: "fgPct",
		label: "FG%",
		hint: "Percentagem de lançamentos de campo",
		format: (v) => formatPct(v.fgPct)
	},
	{
		key: "p2Pct",
		label: "2P%",
		hint: "Percentagem de lançamentos de 2 pontos",
		format: (v) => formatPct(v.p2Pct)
	},
	{
		key: "p3Pct",
		label: "3P%",
		hint: "Percentagem de lançamentos de 3 pontos",
		format: (v) => formatPct(v.p3Pct)
	},
	{
		key: "ftPct",
		label: "LL%",
		hint: "Percentagem de lançamentos livres",
		format: (v) => formatPct(v.ftPct)
	},
	{
		key: "ptsPerMin",
		label: "Pts/min",
		hint: "Produção ofensiva por minuto",
		format: (v) => formatRatio(v.ptsPerMin)
	},
	{
		key: "astTo",
		label: "AST/PER",
		hint: "Assistências por perda de bola",
		format: (v) => formatRatio(v.astTo)
	},
	{
		key: "pir",
		label: "PIR",
		hint: "Valorização FIBA: pts + ressaltos + ast + roubos + blocos − falhados − perdas − faltas",
		format: (v) => formatNum(v.pir)
	}
];
function IndicatorsPanel({ totals, indicators }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-paper p-4 shadow-border sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Indicadores calculados"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Sobre o total do jogo. Lançamentos e acções somam-se pelos períodos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7",
				children: ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-bg/70 px-3 py-3 shadow-border",
					title: item.hint,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs font-medium uppercase tracking-wider text-muted",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-display text-2xl tabular-nums tracking-tight",
						children: item.format(indicators)
					})]
				}, item.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					"Totais: ",
					formatNum(totals.pts),
					" pts · ",
					formatNum(totals.reb),
					" ressaltos ·",
					" ",
					formatNum(totals.ast),
					" ast · ",
					formatMinutesSafe(totals.minutes),
					" min ·",
					" ",
					formatNum(totals.fgm),
					"/",
					formatNum(totals.fga),
					" FG"
				]
			})
		]
	});
}
function formatMinutesSafe(n) {
	return n.toLocaleString("pt-PT", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
}
function PeriodTable({ periods, onChange }) {
	const totals = PERIODS.reduce((acc, { key }) => {
		const p = periods[key];
		for (const def of STAT_DEFS) acc[def.key] += p[def.key];
		return acc;
	}, { ...STAT_DEFS.reduce((a, d) => ({
		...a,
		[d.key]: 0
	}), {}) });
	const derivedTotal = derivePeriod(totals);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 rounded-2xl bg-paper p-4 shadow-border sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Folha por períodos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Células em creme são editáveis. Totais e pontos calculam-se automaticamente."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-full overflow-x-auto rounded-xl bg-bg/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-3xl border-separate border-spacing-0 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "bg-fg text-primary-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "sticky left-0 z-10 rounded-tl-xl bg-fg px-3 py-2.5 text-left text-xs font-medium uppercase tracking-wider",
							children: "Estatística"
						}),
						PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-2.5 text-center text-xs font-medium uppercase tracking-wider",
							children: p.full
						}, p.key)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "rounded-tr-xl px-3 py-2.5 text-center text-xs font-medium uppercase tracking-wider",
							children: "Total"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DerivedRow, {
						label: "Pontos",
						abbr: "PTS",
						values: PERIODS.map(({ key }) => derivePeriod(periods[key]).pts),
						total: derivedTotal.pts
					}),
					STAT_DEFS.map((def, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 === 0 ? "bg-paper/40" : "bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								scope: "row",
								className: cn("sticky left-0 z-10 px-3 py-1.5 text-left font-medium", i % 2 === 0 ? "bg-paper" : "bg-bg"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block leading-tight",
									children: def.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-wider text-muted",
									children: def.abbr
								})]
							}),
							PERIODS.map(({ key }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-1 py-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
									value: periods[key][def.key],
									step: def.step,
									label: `${def.label} ${pLabel(key)}`,
									onCommit: (n) => onChange(key, def.key, n)
								})
							}, key)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "bg-total px-3 py-1 text-center font-display text-base tabular-nums",
								children: def.key === "minutes" ? formatMinutes(totals[def.key]) : def.key === "plusMinus" ? formatPlusMinus(totals[def.key]) : formatNum(totals[def.key])
							})
						]
					}, def.key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DerivedRow, {
						label: "Ressaltos totais",
						abbr: "RT",
						values: PERIODS.map(({ key }) => derivePeriod(periods[key]).reb),
						total: derivedTotal.reb,
						last: true
					})
				] })]
			})
		})]
	});
}
function pLabel(key) {
	return PERIODS.find((p) => p.key === key)?.full ?? key;
}
function CellInput({ value, step, label, onCommit }) {
	const [draft, setDraft] = (0, import_react.useState)(String(value));
	(0, import_react.useEffect)(() => {
		setDraft(String(value));
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "text",
		inputMode: "decimal",
		"aria-label": label,
		value: draft,
		onChange: (e) => setDraft(e.target.value),
		onBlur: () => {
			const n = Number(draft.replace(",", "."));
			onCommit(Number.isNaN(n) ? 0 : n);
		},
		onKeyDown: (e) => {
			if (e.key === "Enter") e.target.blur();
			if (e.key === "ArrowUp") {
				e.preventDefault();
				onCommit(value + step);
			}
			if (e.key === "ArrowDown") {
				e.preventDefault();
				onCommit(value - step);
			}
		},
		className: "h-10 w-full min-w-16 rounded-md bg-cell text-center tabular-nums shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70",
		suppressHydrationWarning: true
	});
}
function DerivedRow({ label, abbr, values, total, last }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "bg-total/80",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
				scope: "row",
				className: cn("sticky left-0 z-10 bg-total px-3 py-2 text-left font-medium", last && "rounded-bl-xl"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block leading-tight",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-wider text-muted",
					children: abbr
				})]
			}),
			values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-1 py-2 text-center tabular-nums",
				children: v
			}, PERIODS[i].key)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: cn("px-3 py-2 text-center font-display text-base tabular-nums", last && "rounded-br-xl"),
				children: total
			})
		]
	});
}
var SHOTS = [
	{
		kind: "2",
		label: "2 pontos",
		madeKey: "fgm2",
		attKey: "fga2"
	},
	{
		kind: "3",
		label: "3 pontos",
		madeKey: "fgm3",
		attKey: "fga3"
	},
	{
		kind: "ft",
		label: "Livres",
		madeKey: "ftm",
		attKey: "fta"
	}
];
var ACTION_STATS = [
	"minutes",
	"oreb",
	"dreb",
	"ast",
	"stl",
	"blk",
	"tov",
	"pf",
	"plusMinus"
];
function ShotPad({ period, stats, onPeriod, onShot, onStat }) {
	const derived = derivePeriod(stats);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 rounded-2xl bg-paper p-4 shadow-border sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold tracking-tight",
					children: "Ao vivo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Toque para marcar. Convertido também conta a tentativa."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl tabular-nums tracking-tight",
					children: [derived.pts, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 text-sm font-sans font-medium text-muted",
						children: "pts neste período"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-1.5 rounded-xl bg-bg/80 p-1",
				role: "tablist",
				"aria-label": "Período",
				children: PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": period === p.key,
					onClick: () => onPeriod(p.key),
					className: cn("h-10 flex-1 rounded-lg text-sm font-medium transition-colors duration-150", period === p.key ? "bg-primary text-primary-fg shadow-border" : "text-muted hover:text-fg"),
					children: p.label
				}, p.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3",
				children: SHOTS.map((shot) => {
					const made = stats[shot.madeKey];
					const att = stats[shot.attKey];
					const pct = att > 0 ? made / att * 100 : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col rounded-xl bg-bg/70 p-3 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: shot.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tabular-nums text-muted",
									children: formatPct(pct)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-3xl tabular-nums tracking-tight",
								children: [made, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg text-muted",
									children: ["/", att]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "default",
									className: "h-12",
									onClick: () => onShot(shot.kind, true),
									children: "Convertido"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									className: "h-12",
									onClick: () => onShot(shot.kind, false),
									children: "Falhado"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-2 self-end text-xs text-muted hover:text-fg",
								onClick: () => {
									if (att <= 0) return;
									onShot(shot.kind, att <= made, true);
								},
								children: "Anular último"
							})
						]
					}, shot.kind);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3",
				children: ACTION_STATS.map((key) => {
					const def = STAT_DEFS.find((d) => d.key === key);
					const value = stats[key];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-xl bg-bg/70 px-3 py-2 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: def.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: def.abbr
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "icon-sm",
									"aria-label": `Diminuir ${def.label}`,
									onClick: () => onStat(key, value - def.step),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("w-12 text-center font-display text-xl tabular-nums", key === "pf" && value >= 5 && "text-danger", key === "plusMinus" && value > 0 && "text-good", key === "plusMinus" && value < 0 && "text-danger"),
									children: key === "minutes" ? formatNum(value, 1) : key === "plusMinus" ? value > 0 ? `+${value}` : value : value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "icon-sm",
									"aria-label": `Aumentar ${def.label}`,
									onClick: () => onStat(key, value + def.step),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
								})
							]
						})]
					}, key);
				})
			})
		]
	});
}
function SummaryBar({ totals, pir }) {
	const items = [
		{
			label: "PTS",
			value: formatNum(totals.pts)
		},
		{
			label: "REB",
			value: formatNum(totals.reb)
		},
		{
			label: "AST",
			value: formatNum(totals.ast)
		},
		{
			label: "RB",
			value: formatNum(totals.stl)
		},
		{
			label: "BL",
			value: formatNum(totals.blk)
		},
		{
			label: "PER",
			value: formatNum(totals.tov)
		},
		{
			label: "FP",
			value: formatNum(totals.pf),
			warn: totals.pf >= 5
		},
		{
			label: "+/−",
			value: formatPlusMinus(totals.plusMinus)
		},
		{
			label: "MIN",
			value: formatMinutes(totals.minutes)
		},
		{
			label: "PIR",
			value: formatNum(pir),
			accent: true
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky bottom-3 z-20 w-full min-w-0 px-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-2xl bg-fg px-2 py-2 text-primary-fg shadow-lift",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex w-max min-w-full items-center justify-between gap-1",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex min-w-14 flex-col items-center rounded-lg px-2 py-1", item.accent && "bg-primary text-primary-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-wider opacity-70",
						children: item.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("font-display text-lg tabular-nums leading-none", item.warn && "text-oak"),
						children: item.value
					})]
				}, item.label))
			})
		})
	});
}
function GamePage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const game = useGameStore((s) => s.games.find((g) => g.id === id));
	const updateMeta = useGameStore((s) => s.updateMeta);
	const setPeriodStat = useGameStore((s) => s.setPeriodStat);
	const addShot = useGameStore((s) => s.addShot);
	const deleteGame = useGameStore((s) => s.deleteGame);
	const duplicateMeta = useGameStore((s) => s.duplicateMeta);
	const [period, setPeriod] = (0, import_react.useState)("q1");
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	if (!game) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-paper px-5 py-10 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Jogo não encontrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Este registo não existe neste dispositivo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Voltar ao caderno"
				})
			})
		]
	});
	const totals = sumPeriods(game.periods);
	const indicators = computeIndicators(totals);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-5 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "icon",
						asChild: true,
						"aria-label": "Voltar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-muted",
								children: [game.athlete || "Atleta", game.number ? ` · #${game.number}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-semibold tracking-tight",
								children: game.opponent ? `vs ${game.opponent}` : "Novo jogo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [formatDatePt(game.date), game.location ? ` · ${game.location}` : ""]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => {
							const copy = duplicateMeta(game.id);
							if (copy) navigate({
								to: "/jogo/$id",
								params: { id: copy.id }
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Nova ficha"]
					}), confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "danger",
						onClick: () => {
							deleteGame(game.id);
							navigate({ to: "/" });
						},
						children: "Confirmar apagar"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => setConfirmDelete(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Apagar"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameMetaForm, {
				game,
				onChange: (patch) => updateMeta(game.id, patch)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotPad, {
				period,
				stats: game.periods[period],
				onPeriod: setPeriod,
				onShot: (kind, made, reverse) => addShot(game.id, period, kind, made, reverse),
				onStat: (key, value) => setPeriodStat(game.id, period, key, value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodTable, {
				periods: game.periods,
				onChange: (p, key, value) => setPeriodStat(game.id, p, key, value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndicatorsPanel, {
				totals,
				indicators
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryBar, {
				totals,
				pir: indicators.pir
			})
		]
	});
}
//#endregion
export { GamePage as component };
