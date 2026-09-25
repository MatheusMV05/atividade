import { OutOfScopeLink } from "@/components/OutOfScopeLink"
import { Card } from "@/components/ui/card"

const produtos = [
  { nome: "Fone de ouvido Bluetooth com cancelamento de ruído", preco: "R$ 249,90" },
  { nome: "Smartwatch com monitor de frequência cardíaca", preco: "R$ 389,00" },
  { nome: "Cafeteira elétrica programável 1,5L", preco: "R$ 179,90" },
  { nome: "Mochila notebook impermeável 15,6\"", preco: "R$ 129,90" },
  { nome: "Kit 3 panelas antiaderentes", preco: "R$ 219,00" },
  { nome: "Air fryer digital 4L", preco: "R$ 299,90" },
]

export function Home() {
  return (
    <div data-cid="home.root" className="mx-auto max-w-[1200px] px-4 py-6">
      <section
        data-cid="home.hero"
        className="mb-6 flex flex-col items-start gap-2 rounded-[6px] bg-gradient-to-r from-ml-blue to-[#2968c8] p-8 text-white"
      >
        <h1 className="text-[24px] font-semibold">Ofertas do dia para você</h1>
        <p className="text-[14px] text-white/90">
          Frete grátis em milhares de produtos para membros meli+. Aproveite antes que acabe.
        </p>
      </section>

      <section aria-labelledby="mais-vendidos" className="mb-8">
        <h2 id="mais-vendidos" className="mb-3 text-[18px] font-semibold text-ml-text">
          Mais vendidos
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {produtos.map((p) => (
            <OutOfScopeLink key={p.nome} className="block">
              <Card className="flex h-full flex-col gap-2 p-3 hover:shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
                <div className="aspect-square rounded-[4px] bg-ml-bg" aria-hidden="true" />
                <p className="line-clamp-2 text-[13px] text-ml-text">{p.nome}</p>
                <p className="text-[15px] font-semibold text-ml-text">{p.preco}</p>
              </Card>
            </OutOfScopeLink>
          ))}
        </div>
      </section>

      <section
        data-cid="home.banner-privacidade"
        aria-labelledby="privacidade-home"
        className="rounded-[6px] border border-ml-border bg-ml-surface p-6"
      >
        <h2 id="privacidade-home" className="text-[16px] font-semibold text-ml-text">
          Sua privacidade é importante para nós
        </h2>
        <p className="mt-1 text-[14px] text-ml-text-secondary">
          Saiba como usamos e protegemos seus dados pessoais no Centro de privacidade, ou acesse{" "}
          <span className="font-semibold">Minha conta &gt; Privacidade</span> pelo menu do seu usuário.
        </p>
      </section>
    </div>
  )
}
