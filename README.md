# FinancasApp Next

Aplicativo de controle financeiro pessoal feito com React Native e Expo.

## Recursos
- Painel com saldo total, receitas e despesas do mês.
- Cadastro, edição e exclusão de movimentações.
- Categorias e filtro do extrato.
- Relatórios visuais de receitas, despesas e gastos por categoria.
- Orçamentos mensais por categoria.
- Metas financeiras com acompanhamento de progresso.
- Tema claro e escuro.
- Perfil local e armazenamento persistente com AsyncStorage.

## Tecnologias
- Expo SDK 51
- React Native 0.74
- JavaScript
- AsyncStorage
- Expo Vector Icons

## Executar
1. Instale Node.js LTS e Expo Go no celular.
2. Clone este repositório.
3. Na pasta do projeto, execute:

```bash
npm install
npx expo start
```

4. Leia o QR Code com o Expo Go.

## Testes automatizados

Execute `npm test` para validar os utilitários de datas, valores e normalização dos dados.

## Observações importantes
- Os dados são armazenados localmente no aparelho. Não existe sincronização entre dispositivos.
- O perfil é local e não representa autenticação online.
- Para login real, recuperação de senha e sincronização na nuvem, será necessário integrar um backend como Supabase ou Firebase.
- Os valores de orçamento e metas são ferramentas de acompanhamento; não movimentam dinheiro real.

## Estrutura inicial
- `App.js`: telas, navegação, formulários e lógica do aplicativo.
- `app.json`: configuração Expo.
- `package.json`: dependências e comandos.
