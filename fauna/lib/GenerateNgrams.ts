import { query as q, Expr } from 'faunadb'

export function GenerateNgrams(phrase: Expr) {
  return q.Distinct(
    q.Union(
      q.Let(
        {
          indexes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          ngramsArray: q.Map(
            q.Var('indexes'),
            q.Lambda('l', q.NGram(q.LowerCase(phrase), q.Var('l'), q.Var('l')))
          ),
        },
        q.Var('ngramsArray')
      )
    )
  )
}
