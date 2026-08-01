    import React from 'react'
    import Image from 'next/image'
    import { useTranslation } from 'react-i18next'
    import './OtherHistoryCard.scss'

   const STATUS_CLASSES = {
  on_the_way:       'status status--transit',
  in_stock:         'status status--success',
  pending:          'status status--pending',
  cancelled:        'status status--error',
  delivered:        'status status--success',
  returned:         'status status--error',
  not_paid:         'status status--error',
  awaiting_payment: 'status status--pending',
  paid_with_bonus: 'status paid_with_bonus',
}

    function OtherHistoryCard({ item }) {
        const { t } = useTranslation()

        return (
            <div className='otherhistorycard'>
                <h1 className='ordernumber'>{t('order.number', { number: item.order_number })}</h1>

                <p className='date'>{t('order.date', { date: item.formatted_date })}</p>

                <p className='statuss'>
                    {t('order.status')}: <span className={STATUS_CLASSES[item.status_display] || 'status'}>
                        {t(`status.${item.status_display}`)}
                    </span>
                </p>

                <h2 className='price'>{t('order.total', { price: item.total_price })}</h2>

            <div className="orderImgs flex flex-col gap-[10px]">
        {item.items.map((product) => (
            <div className="orderImg" key={product.id}>
                {product.img ? (
                    <Image src={product.img} alt="" width={85} height={85} />
                ) : (
                    <div style={{
                        width: 100,
                        height: 100,
                        background: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: 4,
                        flexShrink: 0,
                    }}/>
                )}
                <div className="flex flex-col gap-1">
                    <span>{t('order.quantity', { count: product.quantity })}</span>
                    <span>{t('order.total2', { price: product.price })}</span>
                    <p className='statuss'>
                    {t('order.status')}: <span className={STATUS_CLASSES[product.status?.name] || 'status'}>
                       {product.status?.name ? t(`status.${product.status.name}`) : '—'}
                    </span>
                </p>
                </div>
            </div>
        ))}
    </div>
                <p>{item.address}</p>
            </div>
        )
    }

    export default OtherHistoryCard
