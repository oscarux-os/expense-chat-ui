# Expense AI Chat UI

Detta &#228;r ett separat repo f&#246;r chattytan runt utl&#228;gg. Tanken &#228;r att `design-foundation` ska vara basen och referensen, men att sj&#228;lva produkt-UI:t byggs h&#228;r s&#229; att fundamentet inte beh&#246;ver belastas med app-specifik logik, kopplingar och experiment.

## Vad som finns p&#229; plats

- `app/` med App Router-struktur
- `components.json` f&#246;r `shadcn`
- design tokens i `app/globals.css`
- en f&#246;rsta chat-layout i `components/chat/expense-chat-shell.tsx`
- mockdata som visar hur AI-svaret kan presenteras
- eget git-repo f&#246;r chatten

## T&#228;nkt relation till `design-foundation`

- `design-foundation` &#228;r upstream f&#246;r tokens, typografi, spacing och komponentprinciper
- detta repo &#228;r downstream f&#246;r chat, upload-fl&#246;de, AI-states och utläggsspecifika vyer
- n&#228;r foundation finns lokalt eller som package kan vi ers&#228;tta mock-tokens i `app/globals.css` med riktiga tokens/importer

## Installera n&#228;r package manager och n&#228;t &#228;r tillg&#228;ngligt

1. Installera beroenden:

```bash
npm install
```

2. Initiera `shadcn` i projektet:

```bash
npx shadcn@latest init
```

3. L&#228;gg till `prompt-kit`-komponenterna som passar chatten:

```bash
npx shadcn@latest add "https://prompt-kit.com/c/chat-container.json"
npx shadcn@latest add "https://prompt-kit.com/c/scroll-button.json"
npx shadcn@latest add "https://prompt-kit.com/c/message.json"
npx shadcn@latest add "https://prompt-kit.com/c/prompt-input.json"
npx shadcn@latest add "https://prompt-kit.com/c/system-message.json"
```

## Rekommenderad n&#228;sta integration

- Byt chatlistan mot `ChatContainer`
- Byt meddelandekorten mot `Message`
- Byt footern mot `PromptInput`
- Byt statusraden mot `SystemMessage`
- Mappa f&#228;rg, radius, spacing och typografi mot tokens fr&#229;n `design-foundation`
