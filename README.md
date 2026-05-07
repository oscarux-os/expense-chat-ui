# Expense AI Chat UI

Detta är ett UI-skal för en AI-driven utläggsassistent. Det är avsett att användas som referens och startpunkt — **inte** som ett fristående produktionsrepo. Flytta över komponenterna till ditt riktiga repo och koppla på en riktig AI-motor.

## Det här är ett skal — använd det så

Skalet innehåller alla UI-flöden, animationer och komponenter färdiga. Ingenting i `lib/mock-expense-chat.ts` ska leva vidare i produktion — det är enbart för att demonstrera och iterera på UX.

Skalet bör:
- Kopieras in i ditt produktionsrepo (se nedan)
- Få mock-logiken utbytt mot riktiga API-anrop
- Anpassa datamodellen i `lib/mock-expense-chat.ts` efter er faktiska backend

---

## Vad som finns på plats

- `components/chat/expense-chat-shell.tsx` — hela chat-loopen: upload, scanning, kategori, deltagare, sammanfattning, PDF-generering
- `components/ui/` — alla UI-byggstenar: scanning-card, summary-card, prompt-input, scroll-area, floating-nav m.m.
- `lib/mock-expense-chat.ts` — typer + mock-data (typer lever vidare, mock byts ut)
- Design tokens i `app/globals.css`

---

## Flytta till ett existerande repo

### 1. Kopiera komponenter

```
components/ui/          → ditt-repo/components/ui/
components/chat/        → ditt-repo/components/chat/
lib/mock-expense-chat.ts → ditt-repo/lib/expense-chat.ts  (behåll typerna, ta bort mock-data)
lib/utils.ts            → om cn() inte redan finns
public/WesterAI.png     → ditt-repo/public/
```

### 2. Lägg till beroenden

```bash
npm install class-variance-authority clsx lucide-react \
  react-markdown remark-breaks remark-gfm \
  shiki tailwind-merge use-stick-to-bottom
```

### 3. Byt ut mock-logiken mot riktigt AI-API

I `expense-chat-shell.tsx` finns all logik samlad. Det som behöver bytas ut:

| Vad | Var i shellen | Byt mot |
|-----|---------------|---------|
| Scanning-animation | `startScanFlow()` | Anrop till OCR/AI-endpoint, streama fälten när de kommer in |
| Kategoriförslag | `CATEGORIES` från mock | Hämta från er backend |
| Anställdalista | `EMPLOYEES` från mock | Hämta från er backend |
| PDF-generering | `handleSubmit()` | POST till er PDF-endpoint, få tillbaka en blob-URL |
| Fria textfrågor | MODO-fakta-fallback | Skicka till Claude eller er AI-motor via streaming |

### 4. AI-motor (Claude rekommenderas)

Skapa en Next.js API route:

```ts
// app/api/chat/route.ts
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()

export async function POST(req: Request) {
  const { messages } = await req.json()

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages,
  })

  return new Response(stream.toReadableStream())
}
```

Koppla sedan `expense-chat-shell.tsx` att anropa `/api/chat` istället för att köra mock-timeouts.

### 5. Design tokens

Alla tokens (färger, radius, spacing, typografi) är definierade i `app/globals.css`. I första hand tar vi med vår egen `globals.css` från det riktiga repot och ersätter den här filen — det är det enklaste sättet att få rätt utseende direkt. Om det inte finns en befintlig `globals.css` att ta med går det att justera variablerna direkt i den här filen.

---

## Lokal utveckling

```bash
npm install
npm run dev
```

Öppnas på `http://localhost:3010`.
