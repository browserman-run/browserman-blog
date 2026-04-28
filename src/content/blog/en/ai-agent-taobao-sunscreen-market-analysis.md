---
title: "How to Use AI Agents for Market Analysis: A Taobao Workflow"
description: "A practical workflow for using AI agents to collect ecommerce market data, clean product signals, and turn prices, titles, and sales text into grounded market-analysis hypotheses."
lang: en
translationKey: ai-agent-taobao-sunscreen-market-analysis
pubDate: 2026-04-28
heroImage: ../../../assets/og/taobao-sunscreen-market-analysis.png
---

Most AI market analysis starts too late.

It asks a model to generate insights before the agent has collected real market data. The result is usually a polished report built on thin evidence: plausible, generic, and hard to trust.

A better workflow starts earlier. Before asking an AI agent to analyze a market, make it collect the market signals directly: the search results, product cards, prices, claims, reviews, complaints, competitor pages, and messy language that buyers and sellers actually use.

This article walks through that workflow using one concrete example: a Taobao search for sunscreen products.

The goal is not to produce a definitive sunscreen market report. The goal is to show how an AI market-analysis workflow can move from real browser data to structured hypotheses without pretending it has more evidence than it does.

Most AI market-analysis demos skip this hard part. They start with a clean CSV, a public API, or a made-up dataset. Real ecommerce research starts somewhere messier: a logged-in browser, dynamic pages, product cards, ads, duplicates, redirect links, price text, sales text, and titles stuffed with keyword strategy.

That is exactly where browser agents become useful.

## Step 1: send the agent to the real market surface

We used BrowserMan to let an agent work through a real Chrome session and search Taobao for:

> 防晒霜 — sunscreen

The first workflow was deliberately simple:

1. Open Taobao in a real browser session.
2. Search for the target keyword.
3. Extract visible product cards from the search results page.
4. Clean the result set.
5. Analyze prices, title language, sales text, shops, and links.
6. Separate confirmed observations from hypotheses that require detail-page or review data.

That last step is important. A useful agent should not just summarize. It should know what it actually observed.

## Step 2: capture only the fields the agent can actually observe

From the Taobao search results page, the agent could reliably extract:

- rank,
- product title,
- price,
- sales text, such as “90万+人付款”,
- shop name,
- product URL.

The raw extraction returned 44 search-result rows. After removing duplicate-looking redirect rows and shop-card-like entries, we kept 31 product rows for the first analysis pass.

This sample does **not** include:

- product detail page copy,
- main image OCR,
- review text,
- negative reviews,
- exact sales counts,
- a complete 200-product sample.

So the findings below should be read as search-page observations, not as a finished market report.

## Step 3: turn prices into a first market map

In the cleaned 31-product sample, prices ranged from RMB 31.91 to RMB 224.75.

The median price was RMB 66.90. The mean was RMB 84.36.

| Price band | Products | Share | Median price |
|---|---:|---:|---:|
| Under RMB 50 | 5 | 16.1% | 43.90 |
| RMB 50-100 | 18 | 58.1% | 63.26 |
| RMB 100-200 | 7 | 22.6% | 132.74 |
| Above RMB 200 | 1 | 3.2% | 224.75 |

For this search page, RMB 50-100 looks like the main battlefield.

It is not just a cheap-product zone. It contains mass-market sunscreen, imported brands, domestic brands, large-format products, and scenario-driven products for outdoor use, military training, body use, or face use.

The RMB 100-200 band looks more like the branded-performance zone, with products from names such as ANESSA, Decorte, Shiseido, and Lancome appearing in the sample.

That is already useful if you are building a market map. A product team could start asking:

- What does the RMB 50-100 buyer expect as table stakes?
- What makes a product credible above RMB 100?
- Which claims are being used to justify a premium?
- Which segments are crowded enough to require a sharper angle?

## Step 4: turn product titles into a claim taxonomy

Every product title contained some kind of protection language. That is the category baseline.

The more interesting signal is the second and third layer of title language.

We grouped title keywords into rough categories:

| Title signal | Products matched | Share |
|---|---:|---:|
| High protection | 31 | 100.0% |
| Usage scenario | 22 | 71.0% |
| Makeup / tone correction | 14 | 45.2% |
| Lightweight skin feel | 13 | 41.9% |
| Persona / skin type | 10 | 32.3% |
| Skincare / functional benefit | 8 | 25.8% |

The titles were not just saying “SPF.”

They were stacking claims like:

- refreshing,
- not greasy,
- water-light,
- gel texture,
- waterproof,
- sweatproof,
- outdoor,
- military training,
- commute,
- face and body,
- makeup primer,
- tone-up,
- whitening,
- men,
- students,
- dry skin,
- oily skin.

In other words, the competition is not sunscreen as a function. It is:

> protection × skin feel × use case.

That is a much better content and positioning lens than “sunscreen products are popular.”

## Step 5: convert market signals into content and positioning angles

“Best sunscreen” is a crowded, generic topic.

The Taobao titles suggest more useful entry points:

- sunscreen for military training,
- sunscreen for commuting,
- sunscreen for outdoor or beach use,
- sunscreen for men,
- sunscreen before makeup,
- large-format body sunscreen,
- lightweight sunscreen for oily skin,
- moisturizing sunscreen for dry skin.

For marketers, this is the practical move.

Do not start by asking, “How do we rank for the category keyword?”

Start by asking:

> In which situations does the buyer need this product, and what are they afraid will go wrong?

That is where useful content, ad angles, landing pages, and product positioning come from.

## Step 6: separate hypotheses from validated complaints

Search-result titles do not prove user complaints. But they do point to what sellers are trying to preempt.

If many products promise “not greasy,” “water-light,” “sweatproof,” “makeup-friendly,” or “for oily skin,” those claims are probably responding to known anxieties.

The next step is to validate these against reviews.

The seven complaint categories worth testing are:

1. greasy or heavy feel,
2. pilling or poor makeup compatibility,
3. white cast,
4. eye sting,
5. acne or clogged-skin concerns,
6. irritation or allergy,
7. weak waterproofing, poor durability, or annoying reapplication.

This is where the workflow can become much more valuable.

Once the agent can read review text, the analysis can compare:

- what sellers promise in titles,
- what detail pages emphasize,
- what buyers praise,
- what negative reviews repeat.

That comparison is where real market opportunity often appears.

## Why this workflow needs a real browser agent

This kind of work is awkward for a normal chatbot.

It is not just a question-answering task. It needs execution:

- open a dynamic ecommerce page,
- work through a real browser session,
- use the user’s existing logged-in state when needed,
- read rendered product cards,
- handle redirects and duplicate-looking rows,
- preserve links for later inspection,
- return structured data,
- keep the user’s cookies local.

That is the BrowserMan angle.

BrowserMan does not make the agent smarter by itself. It gives the agent a reliable way to operate the real web.

The browser stays with the user. The login state stays local. The agent gets delegated access to do the task.

For market analysis, that matters because the most useful data is often not sitting in a clean API. It is inside the real surfaces teams already use: ecommerce sites, marketplaces, dashboards, social feeds, review pages, admin tools, and customer portals.

## How to extend this into a full market-analysis system

This sunscreen sample is only the first layer.

A fuller version of the workflow would add:

1. **More pages** — expand from 31 products to 200+ products.
2. **Product detail pages** — extract brand claims, ingredients, specs, hero-image text, and bundle structure.
3. **Review mining** — collect positive and negative reviews, then classify repeated complaints.
4. **Claim-vs-complaint mapping** — compare seller promises against buyer disappointment.
5. **Content opportunity output** — generate SEO topics, social posts, ad angles, and product positioning notes.
6. **Tracking** — rerun the workflow weekly to watch price moves, new claims, and competitor shifts.

The same pattern can apply to many categories:

- coffee machines,
- cat food,
- camping gear,
- running shoes,
- air purifiers,
- kids’ desks,
- app marketplace reviews,
- SaaS competitor pages.

The category changes. The workflow stays similar.

## The real lesson: AI market analysis starts with data collection

The useful part of AI market analysis is not that a model can produce confident observations.

It is that an agent can go to the real market surface, collect messy signals, clean them, and say:

> Here is what I actually saw. Here is what I can infer. Here is what still needs validation.

That is the difference between a content prompt and an operator workflow.

The first gives you polished guesses.

The second gives you a repeatable way to learn from the market.

That is what BrowserMan is built for: giving agents delegated access to real browser work, so they can produce grounded outputs instead of abstract summaries.
