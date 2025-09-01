"use client"

import { Check, X, Shield } from "lucide-react"
import { useEffect, useState } from "react"

interface AIMatchReportProps {
  trialId: string
}

export function AIMatchReport({ trialId }: AIMatchReportProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const targetScore = 80
  const passedCount = 6
  const totalCount = 7

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval)
            return targetScore
          }
          return prev + 2
        })
      }, 20)
      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [targetScore])

  const passedCriteria = [
    "Condition match",
    "Location match",
    "Age requirement",
    "Gender requirement",
    "Race requirement",
    "Language requirement",
  ]

  const failedCriteria = ["Date of diagnosis"]

  const circumference = 2 * Math.PI * 40
  const strokeDasharray = `${(passedCount / totalCount) * circumference} ${circumference}`

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Great fit! You may qualify for this study.</h2>
        <p className="text-gray-600">
          Based on your answers, you passed {passedCount} out of {totalCount} eligibility criteria. See your match
          details below.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="6" fill="none" />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3b82f6"
              strokeWidth="6"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                strokeDashoffset: circumference - (animatedScore / 100) * circumference,
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-900 mb-1">{animatedScore}%</span>
            <span className="text-sm text-gray-600 mb-2">
              Criteria passed {passedCount}/{totalCount}
            </span>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              COMPATIBILITY SCORE
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <Check className="h-3 w-3 text-green-600" />
            </div>
            Passed Criteria
          </h3>
          <ul className="space-y-3">
            {passedCriteria.map((criteria, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="h-2.5 w-2.5 text-green-600" />
                </div>
                {criteria}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2">
              <X className="h-3 w-3 text-red-600" />
            </div>
            Failed Criteria
          </h3>
          <ul className="space-y-3">
            {failedCriteria.map((criteria, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <X className="h-2.5 w-2.5 text-red-600" />
                </div>
                {criteria}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Shield className="h-4 w-4 mr-2" />
          Your information is securely shared only with this research site and never sold.
        </div>
      </div>
    </div>
  )
}
