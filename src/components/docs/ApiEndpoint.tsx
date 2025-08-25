"use client";
import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";

interface EndpointProps {
  method: "GET" | "POST";
  endpoint: string;
  title: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  headers?: Array<{
    name: string;
    value: string;
    description: string;
  }>;
  requestExample?: string;
  responseExample?: string;
  requestLanguage?: string;
  responseLanguage?: string;
}

export default function ApiEndpoint({
  method,
  endpoint,
  title,
  description,
  parameters = [],
  headers = [],
  requestExample,
  responseExample,
  requestLanguage = "json",
  responseLanguage = "json"
}: EndpointProps) {
  const methodColors = {
    GET: "bg-green-500",
    POST: "bg-blue-500",
    PUT: "bg-yellow-500",
    DELETE: "bg-red-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-3">
          <span className={`${methodColors[method]} text-white px-3 py-1 rounded-lg text-sm font-semibold`}>
            {method}
          </span>
          <code className="bg-gray-200 px-3 py-1 rounded-lg text-gray-800 font-mono text-sm">
            {endpoint}
          </code>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="p-6">
        {/* Parameters */}
        {parameters.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Required</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parameters.map((param, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{param.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{param.type}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          param.required 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {param.required ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Headers */}
        {headers.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Headers</h4>
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono text-gray-900">{header.name}:</code>
                    <code className="text-sm font-mono text-teal-600">{header.value}</code>
                  </div>
                  <p className="text-sm text-gray-600">{header.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="grid lg:grid-cols-2 gap-6">
          {requestExample && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Request Example</h4>
              <CodeBlock 
                code={requestExample}
                language={requestLanguage}
              />
            </div>
          )}
          
          {responseExample && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Response Example</h4>
              <CodeBlock 
                code={responseExample}
                language={responseLanguage}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
