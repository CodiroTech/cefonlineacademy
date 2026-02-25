'use client'

import { CheckCircle2, AlertCircle, X } from 'lucide-react'

interface PaymentStatusOverlayProps {
  result: { status: 'success' | 'failure' | null; data: any }
  onClose: () => void
}

export function PaymentStatusOverlay({ result, onClose }: PaymentStatusOverlayProps) {
  if (!result.status) return null
  const isSuccess = result.status === 'success'
  const apiMessage = result.data?.message
  const txDetails = result.data?.data || result.data
  const paymentDate = txDetails?.meezan_payment_date || txDetails?.faysal_payment_date || txDetails?.order_date || new Date().toLocaleDateString()

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
        <div className={`p-8 flex flex-col items-center justify-center ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
          {isSuccess ? <CheckCircle2 size={80} className="text-green-500 mb-4" /> : <AlertCircle size={80} className="text-red-500 mb-4" />}
          <h2 className={`text-3xl font-bold ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h2>
          <p className="text-gray-600 text-center mt-2 font-medium px-4">
            {apiMessage || (isSuccess ? 'Thank you for your generous donation.' : 'There was an issue processing your transaction.')}
          </p>
        </div>

        {isSuccess && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Transaction Details</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <DetailItem label="Donation Reference Number" value={txDetails?.order_number || txDetails?.meezan_order_number || txDetails?.basket_id || 'N/A'} />
              <DetailItem label="Status" value={txDetails?.payment_status?.toUpperCase() || (isSuccess ? 'PAID' : 'FAILED')} color={isSuccess ? 'text-green-600' : 'text-red-600'} />
              <DetailItem label="Donation Amount" value={`${txDetails?.grand_total || txDetails?.transaction_amount || '0'} PKR`} isBold />
              <DetailItem label="Payment Method" value={txDetails?.payment_method?.replace('_', ' ').toUpperCase() || txDetails?.PaymentName?.toUpperCase() || 'BANK'} />
              <DetailItem label="Donation Date" value={paymentDate} />
            </div>
          </div>
        )}

        <div className="p-6 bg-gray-50 flex justify-center border-t">
          <button onClick={() => (window.location.href = '/donations')}
            className="bg-[#065D80] text-white px-10 py-3 rounded-full font-bold hover:bg-[#065D80]/90 transition-all shadow-md active:scale-95">
            Return to Donations
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value, color = 'text-gray-900', isBold = false }: { label: string; value: string; color?: string; isBold?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{label}</span>
      <span className={`text-sm ${isBold ? 'font-bold' : 'font-medium'} ${color} truncate`}>{value}</span>
    </div>
  )
}
