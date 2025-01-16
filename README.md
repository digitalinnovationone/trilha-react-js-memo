# React.JS | Curso de Memo

## Objetivo

Entendimento da forma que a renderização dos componentes filhos são feitas no React e como é possível otimizar este processo através de um recurso chamado `memo`.

## Pré-requisitos

- Introdução ao React
- Componentes, propriedades e estados
- Introdução aos hooks
- Hook `useState`
- Hook `useEffect`
- Hook `useMemo`
- Hook `useCallback`

## Executando o projeto
Instale as dependências do projeto
```
yarn
```

Execute o projeto em um servidor de desenvolvimento
```
yarn dev
```
  
## Introdução ao `React.memo`

Um dos recursos que o React fornece para otimizarmos nossas aplicações é o `React.memo` (repare que não estamos utilizando o termo `*use*` como prefixo, logo, não estamos falando de um hook). Mas, antes de entendermos como podemos aplicar essa solução, é importante revermos alguns conceitos do React relacionado à quando um componente re-renderiza:

O React re-renderiza um componente toda vez que:

- O **componente pai** sofre uma re-renderização
- As **propriedades**, **estado** e **valores reativos** de um componente mudam

Em muitos cenários, essas re-renderizações são **desnecessárias**, especialmente se as propriedades de um componente não mudaram e a re-renderização está sendo disparada pela atualização de seu componente pai. Caso a lógica ou a renderização desse componente-filho seja custosa (grande lista, gráficos, tabelas, etc), essa re-renderização pode trazer problemas de performance para a aplicação e para a experiência dos seus usuários.

```tsx
const ParentComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <ChildComponent />
    </div>
  );
};

const ChildComponent = () => {
  console.log('Renderizou o Child!');
  return <p>Eu sou um componente estático.</p>;
};
```

O `React.memo` surgiu como um recurso que pode ser utilizado para otimizar, em certos momentos, os componentes funcionais. De forma resumida, o `memo` irá armazenar em memória (*cachear*)  o retorno do componente em que você está aplicando a função caso suas **propriedades** realmente mudem de uma renderização para outra.

## Estrutura básica do `React.memo`

```tsx
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

```tsx
import { memo } from 'react';

const MemoizedComponent = memo(function SomeComponent(props) {
  // ...
});
```

```tsx
import { memo } from 'react';

interface SomeComponentProps {
  title: string;
  count: number;
}

const SomeComponent: React.FC<SomeComponentProps> = ({ title, count }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};

export default memo(SomeComponent);
```

**Parâmetros**

- `SomeComponent`: Componente que você deseja memoizar.
    - O `memo` não modifica o componente, mas retorna um novo componente memorizado.
    - Qualquer componente React válido, incluindo funções e componentes `forwardRef`, é aceito.
- `arePropsEqual` (opcional):  Uma função que aceita dois argumentos: as *props* anteriores do componente e suas novas *props*.
    - Ela deve retornar `true` se as propriedades antigas e novas forem iguais, ou seja, se o componente renderizar a mesma saída e se comportar da mesma forma com as novas *props* como fazia com as antigas.
    - Caso contrário, deve retornar `false`.
    - **Normalmente, você não especificará essa função. Por padrão, o React comparará cada propriedade usando [`Object.is`](http://Object.is)** (funciona da mesma forma que o array de dependências dos hooks)**.**

**Retorno**

O `memo` retorna um novo componente React. Ele se comporta da mesma maneira que o componente fornecido ao `memo`, exceto que o React nem sempre o renderizará novamente quando seu componente pai for renderizado, a menos que suas propriedades tenham mudado de uma renderização para outra.