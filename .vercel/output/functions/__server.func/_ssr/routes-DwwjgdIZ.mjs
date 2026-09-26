import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Plus } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { _ as sumPeriods, c as computeIndicators, f as formatNum, g as resultKind, m as formatPlusMinus, p as formatPct, r as useGameStore, u as formatDatePt, v as cn } from "./router-Bg3fLLwA.mjs";
import { t as Button } from "./button-CkTIL_fI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DwwjgdIZ.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-cell text-fg",
		leather: "bg-primary/15 text-primary",
		win: "bg-good/15 text-good",
		loss: "bg-danger/15 text-danger",
		muted: "bg-fg/6 text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function SeasonOverview({ games, onNew, onDemo }) {
	const totalsList = [...games].sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : b.updatedAt - a.updatedAt).map((g) => ({
		game: g,
		totals: sumPeriods(g.periods)
	}));
	const n = totalsList.length;
	const avg = (pick) => n === 0 ? 0 : totalsList.reduce((s, x) => s + pick(x.totals), 0) / n;
	const sumFg = totalsList.reduce((s, x) => s + x.totals.fgm, 0);
	const sumFga = totalsList.reduce((s, x) => s + x.totals.fga, 0);
	const sum3 = totalsList.reduce((s, x) => s + x.totals.fgm3, 0);
	const sum3a = totalsList.reduce((s, x) => s + x.totals.fga3, 0);
	const sumFt = totalsList.reduce((s, x) => s + x.totals.ftm, 0);
	const sumFta = totalsList.reduce((s, x) => s + x.totals.fta, 0);
	const avgPir = n === 0 ? 0 : totalsList.reduce((s, x) => s + computeIndicators(x.totals).pir, 0) / n;
	const maxPts = Math.max(1, ...totalsList.map((x) => x.totals.pts));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted",
					children: "Registo individual"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "Caderno de jogo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted sm:text-base",
					children: "Quinze estatísticas por período, à maneira da folha de cálculo — com totais, percentagens e PIR a nascerem sozinhos."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				size: "lg",
				onClick: onNew,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo jogo"]
			})]
		}), n === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			onNew,
			onDemo
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Jogos",
						value: String(n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Pts/jogo",
						value: formatNum(avg((t) => t.pts), 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Reb/jogo",
						value: formatNum(avg((t) => t.reb), 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "Ast/jogo",
						value: formatNum(avg((t) => t.ast), 1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "FG%",
						value: formatPct(sumFga > 0 ? sumFg / sumFga * 100 : null)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
						label: "PIR méd.",
						value: formatNum(avgPir, 1)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-paper p-4 shadow-border sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold tracking-tight",
						children: "Pontos por jogo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"3P ",
							formatPct(sum3a > 0 ? sum3 / sum3a * 100 : null),
							" · LL",
							" ",
							formatPct(sumFta > 0 ? sumFt / sumFta * 100 : null)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex h-36 items-end gap-2",
					children: [...totalsList].reverse().map(({ game, totals }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jogo/$id",
						params: { id: game.id },
						className: "group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5 no-underline",
						title: `${formatDatePt(game.date)} · ${totals.pts} pts`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tabular-nums text-muted",
								children: totals.pts
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-full max-w-12 rounded-t-md bg-primary/80 transition-colors duration-150 group-hover:bg-primary",
								style: { height: `${Math.max(8, totals.pts / maxPts * 100)}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-full truncate text-center text-xs text-muted",
								children: game.opponent || "—"
							})
						]
					}, game.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Jogos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: totalsList.map(({ game, totals }) => {
					const kind = resultKind(game.result);
					const pir = computeIndicators(totals).pir;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jogo/$id",
						params: { id: game.id },
						className: "flex flex-col gap-3 rounded-2xl bg-paper px-4 py-4 no-underline shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-lg font-semibold tracking-tight",
										children: ["vs ", game.opponent || "Adversário"]
									}),
									kind !== "unknown" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: kind === "win" ? "win" : "loss",
										children: kind === "win" ? "Vitória" : "Derrota"
									}),
									game.role ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "muted",
										children: game.role === "titular" ? "Titular" : "Suplente"
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									formatDatePt(game.date),
									game.competition ? ` · ${game.competition}` : "",
									game.result ? ` · ${game.result}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: "PTS",
									v: formatNum(totals.pts),
									accent: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: "REB",
									v: formatNum(totals.reb)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: "AST",
									v: formatNum(totals.ast)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: "MIN",
									v: formatNum(totals.minutes, 1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: "+/−",
									v: formatPlusMinus(totals.plusMinus)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									k: "PIR",
									v: formatNum(pir),
									accent: true
								})
							]
						})]
					}) }, game.id);
				})
			})] })
		] })]
	});
}
function StatTile({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-paper px-4 py-3 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl tabular-nums tracking-tight sm:text-3xl",
			children: value
		})]
	});
}
function Mini({ k, v, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("font-display text-lg leading-none", accent && "text-primary"),
			children: v
		})]
	});
}
function EmptyState({ onNew, onDemo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col items-start rounded-2xl bg-paper px-5 py-10 shadow-border sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-muted",
				children: "Sem jogos ainda"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 max-w-md font-display text-3xl font-semibold tracking-tight",
				children: "A folha está em branco. Abra o primeiro jogo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-sm text-muted",
				children: "Registe minutos, lançamentos, ressaltos, assistências, roubos, bloqueios, perdas, faltas e mais/menos — por período, com indicadores FIBA."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: onNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Novo jogo"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: onDemo,
					children: "Carregar exemplos"
				})]
			})
		]
	});
}
function Home() {
	const navigate = useNavigate();
	const games = useGameStore((s) => s.games);
	const createGame = useGameStore((s) => s.createGame);
	const loadDemo = useGameStore((s) => s.loadDemo);
	function openNew() {
		const last = games[0];
		const game = createGame(last ? {
			team: last.team,
			athlete: last.athlete,
			number: last.number,
			position: last.position,
			role: last.role
		} : {
			athlete: "BamBam",
			number: "00"
		});
		navigate({
			to: "/jogo/$id",
			params: { id: game.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonOverview, {
		games,
		onNew: openNew,
		onDemo: loadDemo
	});
}
//#endregion
export { Home as component };
